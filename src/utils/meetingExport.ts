import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AgendaItem, Meeting, Participant } from '../types';

export function exportAgendaToPDF(meeting: Meeting | null, agenda: AgendaItem[], participants: Participant[]) {
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.text('Meeting Agenda', 14, 20);
  doc.setFontSize(14);
  doc.text(`Title: ${meeting?.title}`, 14, 32);
  doc.text(`Description: ${meeting?.description || 'No description'}`, 14, 40);
  doc.text(`Participants: ${participants.map(p => p.displayName).join(', ')}`, 14, 48);

  autoTable(doc, {
    startY: 56,
    head: [['Topic', 'Duration', 'Description']],
    body: agenda.map(item => [item.title, `${item.duration}m`, item.description || '']),
    theme: 'grid',
    headStyles: { fillColor: '#D97706' },
  });

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
