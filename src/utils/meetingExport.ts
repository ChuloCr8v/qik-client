import { AgendaItem, Meeting, Participant } from '../types';

export async function exportAgendaToPDF(meeting: Meeting | null, agenda: AgendaItem[], participants: Participant[]) {
  const [{ default: jsPDF }, { default: autoTable }] = await Promise.all([
    import('jspdf'),
    import('jspdf-autotable'),
  ]);
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Color Palette
  const amberColor = '#d97706'; // Primary Accent
  const slateDark = '#0f172a'; // Slate 900
  const slateMuted = '#64748b'; // Slate 500
  const slateLight = '#f8fafc'; // Slate 50
  const borderLight = '#e2e8f0'; // Slate 200

  // 1. Top Decorative Brand Bar
  doc.setFillColor(amberColor);
  doc.rect(0, 0, 210, 4, 'F');

  let y = 20;

  // 2. Document Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(slateDark);
  doc.text('Meeting Agenda', 14, y);
  y += 10;

  // 3. Meeting Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(slateDark);
  const titleText = meeting?.title || 'Untitled Meeting';
  doc.text(titleText, 14, y);
  y += 6;

  // 4. Description (Dynamic wrapping & sizing)
  if (meeting?.description) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(slateMuted);
    const splitDesc = doc.splitTextToSize(meeting.description, 182); // 210mm - 14mm margins * 2
    doc.text(splitDesc, 14, y);
    y += (splitDesc.length * 5) + 6;
  } else {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(10);
    doc.setTextColor(slateMuted);
    doc.text('No meeting description provided.', 14, y);
    y += 8;
  }

  // Accent Line Divider
  doc.setDrawColor(borderLight);
  doc.setLineWidth(0.5);
  doc.line(14, y, 196, y);
  y += 8;

  // 5. Metadata Grid Card
  doc.setFillColor(slateLight);
  doc.rect(14, y, 182, 20, 'F');
  doc.setDrawColor(borderLight);
  doc.setLineWidth(0.3);
  doc.rect(14, y, 182, 20, 'D');

  const totalDuration = agenda.reduce((sum, item) => sum + item.duration, 0);
  const formattedDate = meeting?.scheduledAt
    ? new Date(meeting.scheduledAt).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short'
      })
    : 'Not scheduled';

  // Metadata Titles
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(slateMuted);
  doc.text('DATE & TIME', 20, y + 6);
  doc.text('TOTAL DURATION', 85, y + 6);
  doc.text('STATUS', 150, y + 6);

  // Metadata Values
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(slateDark);
  doc.text(formattedDate, 20, y + 12);
  doc.text(`${totalDuration} mins`, 85, y + 12);
  
  const statusStr = (meeting?.status || 'scheduled').toUpperCase();
  doc.setFont('helvetica', 'bold');
  doc.text(statusStr, 150, y + 12);

  y += 28;

  // 6. Attendees Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(slateDark);
  doc.text('ATTENDEES', 14, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(slateDark);
  const attendeeList = participants.map(p => p.displayName).join(', ');
  if (attendeeList) {
    const splitAttendees = doc.splitTextToSize(attendeeList, 182);
    doc.text(splitAttendees, 14, y);
    y += (splitAttendees.length * 5) + 10;
  } else {
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(slateMuted);
    doc.text('No participants registered yet.', 14, y);
    y += 10;
  }

  // 7. Agenda Table Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(slateDark);
  doc.text('AGENDA TOPICS', 14, y);
  y += 6;

  // 8. Agenda Table Rendering
  autoTable(doc, {
    startY: y,
    head: [['Status', 'Topic', 'Duration', 'Description']],
    body: agenda.map(item => [
      item.completed ? 'COMPLETED' : 'PENDING',
      item.title,
      `${item.duration}m`,
      item.description || '-'
    ]),
    theme: 'striped',
    headStyles: {
      fillColor: slateDark,
      textColor: '#ffffff',
      fontStyle: 'bold',
      fontSize: 9
    },
    columnStyles: {
      0: { cellWidth: 26, fontStyle: 'bold', halign: 'center' },
      1: { cellWidth: 50, fontStyle: 'bold' },
      2: { cellWidth: 20, halign: 'center' },
      3: { cellWidth: 'auto' }
    },
    styles: {
      fontSize: 9,
      cellPadding: 4,
      valign: 'middle'
    },
    didParseCell: (data) => {
      // Highlight Status column beautifully
      if (data.column.index === 0 && data.section === 'body') {
        const isCompleted = data.cell.raw === 'COMPLETED';
        data.cell.styles.textColor = isCompleted ? '#059669' : '#b45309'; // Emerald 600 or Amber 700
      }
    }
  });

  // 9. Two-pass page footers addition (handles correct total page count dynamically)
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(slateMuted);
    
    // Bottom thin line border
    doc.setDrawColor(borderLight);
    doc.setLineWidth(0.3);
    doc.line(14, 282, 196, 282);

    const pageStr = `Page ${i} of ${totalPages}`;
    doc.text(pageStr, 196 - doc.getTextWidth(pageStr), 287);
    doc.text('Generated by QuikAgenda', 14, 287);
  }

  doc.save(`${meeting?.title || 'Agenda'}.pdf`);
}

export function exportAgendaToMarkdown(meeting: Meeting | null, agenda: AgendaItem[], participants: Participant[]) {
  let markdown = `# ${meeting?.title}\n\n`;
  markdown += `**Description:** ${meeting?.description || 'No description'}\n`;
  markdown += `**Participants:** ${participants.map(p => p.displayName).join(', ')}\n\n`;
  markdown += '| Topic | Duration | Description |\n';
  markdown += '| :--- | :--- | :--- |\n';
  agenda.forEach(item => {
    markdown += `| ${item.title} | ${item.duration}m | ${item.description || '-'} |\n`;
  });

  const blob = new Blob([markdown], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${meeting?.title || 'Agenda'}.md`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
