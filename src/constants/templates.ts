import { AgendaItem } from '../types';

export interface MeetingTemplate {
  name: string;
  description?: string;
  items: Omit<AgendaItem, 'id' | 'order'>[];
}

export const MEETING_TEMPLATES: MeetingTemplate[] = [
  // ─── AGILE & ENGINEERING ───────────────────────────────────────────────────
  {
    name: 'Daily Scrum / Standup',
    description: 'A quick sync to align on goals and unblock the team.',
    items: [
      { title: 'Goal Check-in', duration: 2, description: 'Quick reaffirmation of the sprint goal and whether we are still tracking toward it.' },
      { title: 'Accomplishments', duration: 5, description: 'What did each team member complete since the last standup? Keep it factual and brief.' },
      { title: 'Daily Plan', duration: 5, description: 'Primary focus tasks for the next 24 hours and any dependencies that need coordination.' },
      { title: 'Blockers & Impediments', duration: 3, description: 'Identifying issues that are slowing progress and require immediate attention or escalation.' },
    ]
  },
  {
    name: 'Sprint Planning',
    description: 'Align the team on which backlog items to commit to for the upcoming sprint and how to execute them.',
    items: [
      { title: 'Sprint Goal Definition', duration: 10, description: 'Collaboratively define a single, clear sprint goal that reflects the most valuable outcome the team can deliver this iteration.' },
      { title: 'Backlog Refinement Review', duration: 15, description: 'Walk through the top refined backlog items, confirm acceptance criteria are well-written, and ensure everyone understands the expected output.' },
      { title: 'Capacity Planning', duration: 10, description: 'Review each team member\'s availability accounting for holidays, on-call rotations, and known distractions to accurately gauge sprint capacity in story points or hours.' },
      { title: 'Story Selection & Assignment', duration: 20, description: 'Pull stories into the sprint based on capacity. Discuss technical dependencies, assign initial ownership, and call out any cross-team coordination needed.' },
      { title: 'Task Breakdown', duration: 20, description: 'Decompose selected stories into concrete engineering tasks. Surface any unknowns, spikes, or research items needed before work can begin.' },
      { title: 'Commitment & Confidence Check', duration: 5, description: 'Each team member verbally confirms their understanding and confidence in the plan. Resolve any last-minute concerns before closing the session.' },
    ]
  },
  {
    name: 'Sprint Retrospective',
    description: 'Structured reflection on team process, collaboration, and delivery quality to drive continuous improvement.',
    items: [
      { title: 'Safety Check', duration: 5, description: 'Anonymous 1–5 rating to gauge psychological safety before diving into candid discussion. Low scores indicate the team needs more trust-building before meaningful feedback can emerge.' },
      { title: 'What Went Well', duration: 10, description: 'Celebrate wins — both in outcomes and process. Positive reinforcement of effective behaviors ensures they are consciously repeated in future sprints.' },
      { title: 'What Didn\'t Go Well', duration: 15, description: 'Honest and blameless discussion of friction points, missed goals, communication gaps, and recurring frustrations. Focus on systemic issues rather than individual blame.' },
      { title: 'Root Cause Exploration', duration: 10, description: 'Pick the top 1–2 pain points and apply 5-Why analysis or fishbone diagrams to understand the underlying cause rather than treating symptoms.' },
      { title: 'Action Items & Owners', duration: 10, description: 'Define specific, measurable improvements with a named owner and a deadline. Limit to 3 action items maximum to avoid overloading the team between sprints.' },
    ]
  },
  {
    name: 'Sprint Review / Demo',
    description: 'Showcase completed sprint work to stakeholders and gather feedback to inform the product roadmap.',
    items: [
      { title: 'Sprint Goal Recap', duration: 5, description: 'Restate what the team committed to at the beginning of the sprint and whether the goal was met, partially met, or missed.' },
      { title: 'Live Product Demo', duration: 25, description: 'Walk stakeholders through completed features in a working environment — not slides or screenshots. Narrate the user journey and highlight business value delivered.' },
      { title: 'What Was Not Completed', duration: 5, description: 'Transparently communicate any stories that were not finished, why they were deferred, and what the plan is for them in the next sprint.' },
      { title: 'Stakeholder Q&A & Feedback', duration: 15, description: 'Open discussion for stakeholders to ask clarifying questions, share reactions, and validate whether what was built meets their expectations or needs adjustment.' },
      { title: 'Backlog Adjustments Discussion', duration: 10, description: 'Based on demo feedback, discuss which upcoming backlog items should be reprioritized, modified, or removed before the next sprint planning session.' },
    ]
  },
  {
    name: 'Backlog Grooming / Refinement',
    description: 'Collaboratively prepare upcoming backlog items so they are sprint-ready with clear acceptance criteria and accurate estimates.',
    items: [
      { title: 'Backlog Health Overview', duration: 5, description: 'Review the current state of the backlog — how many items exist, what\'s estimated vs unestimated, and whether priorities still reflect current business needs.' },
      { title: 'Story Walkthrough', duration: 20, description: 'Product Owner reads through the top unprepared stories one by one. Team asks clarifying questions until everyone understands the context, the user need, and the expected behavior.' },
      { title: 'Acceptance Criteria Review', duration: 15, description: 'For each story, confirm or write concrete, testable acceptance criteria. Use Given-When-Then format to make scenarios explicit and prevent scope ambiguity later.' },
      { title: 'Estimation', duration: 20, description: 'Use Planning Poker or T-shirt sizing to estimate complexity and effort. Discuss divergence openly — outlier estimates often uncover hidden complexity or different assumptions.' },
      { title: 'Dependency Mapping', duration: 10, description: 'Identify stories that depend on external teams, APIs, decisions, or designs not yet available. Flag these explicitly to prevent sprint bottlenecks.' },
    ]
  },
  {
    name: 'Architecture Decision Review',
    description: 'Evaluate proposed technical architecture changes with engineering stakeholders before committing to implementation.',
    items: [
      { title: 'Problem Statement', duration: 10, description: 'Clearly articulate the current technical limitation or opportunity being addressed. Frame the "why now" and what happens if no action is taken.' },
      { title: 'Proposed Architecture Walkthrough', duration: 20, description: 'Present the proposed solution with diagrams covering system components, data flow, integrations, and deployment model. Walk through how it addresses the stated problem.' },
      { title: 'Trade-off Analysis', duration: 15, description: 'Explicitly discuss what is gained and what is sacrificed with this approach — performance, complexity, cost, team skill requirements, and vendor lock-in.' },
      { title: 'Alternative Approaches Considered', duration: 10, description: 'Briefly present 1–2 alternative architectures that were evaluated and explain why they were ruled out, to demonstrate due diligence and prevent re-litigation later.' },
      { title: 'Risk & Mitigation', duration: 10, description: 'Enumerate the top technical and operational risks with this approach, and describe specific mitigation strategies for each.' },
      { title: 'Decision & Next Steps', duration: 5, description: 'Formally record the group\'s decision. Assign ownership of the Architecture Decision Record (ADR) and define the first concrete implementation steps.' },
    ]
  },
  {
    name: 'Incident Post-Mortem',
    description: 'Blameless review of a production incident to understand what happened, why it happened, and how to prevent recurrence.',
    items: [
      { title: 'Incident Timeline Walkthrough', duration: 15, description: 'Chronological reconstruction of events from first signal to resolution. Include detection time, escalation steps, and all actions taken by on-call engineers.' },
      { title: 'Impact Assessment', duration: 10, description: 'Quantify the business and user impact: affected users, revenue impact, SLA breach, data loss, and customer-facing degradation duration.' },
      { title: 'Root Cause Analysis', duration: 20, description: 'Apply 5-Why or fault tree analysis to trace the incident to its true systemic root cause — not just the immediate trigger. Distinguish contributing factors from root causes.' },
      { title: 'What Went Well in Response', duration: 5, description: 'Acknowledge effective detection mechanisms, communication, tooling, or coordination during the incident that helped limit the blast radius or speed up resolution.' },
      { title: 'Action Items', duration: 15, description: 'Define concrete preventive and detective improvements with owners, target completion dates, and priority levels. Include monitoring improvements, runbook updates, and code or config fixes.' },
      { title: 'Communication & Stakeholder Review', duration: 5, description: 'Review how internal and external communication was handled during the incident. Were the right people notified at the right time? Improve templates if needed.' },
    ]
  },
  {
    name: 'Code Review Standards Workshop',
    description: 'Establish or revisit shared code review guidelines to ensure consistency, quality, and a respectful review culture.',
    items: [
      { title: 'Why Code Review Matters', duration: 10, description: 'Align on the purpose of code review — not gatekeeping, but knowledge sharing, defect detection, and collective code ownership. Set the cultural tone.' },
      { title: 'Current Pain Points', duration: 15, description: 'Open discussion of frustrations with the existing review process — turnaround time, nitpicking, inconsistent feedback, unclear expectations, or review fatigue.' },
      { title: 'Review Checklist Definition', duration: 20, description: 'Collaboratively build a checklist covering correctness, test coverage, naming conventions, security considerations, performance implications, and documentation.' },
      { title: 'PR Size & Scope Norms', duration: 10, description: 'Agree on expected PR size, commit message standards, and how to handle large features through feature flags or incremental PRs.' },
      { title: 'Feedback Language Standards', duration: 10, description: 'Discuss and adopt the Conventional Comments standard or similar framework to make feedback tone explicit, constructive, and non-personal.' },
      { title: 'Tooling & Automation', duration: 5, description: 'Review what linting, formatting, and automated checks run in CI so human reviewers can focus on logic and design rather than style issues.' },
    ]
  },

  // ─── PRODUCT MANAGEMENT ────────────────────────────────────────────────────
  {
    name: 'Project Kickoff',
    description: 'Standardize project beginnings with clear goals, defined roles, and shared understanding of success.',
    items: [
      { title: 'Project Vision', duration: 10, description: 'Alignment on the "Why" behind the project — the customer problem being solved and the business opportunity being captured.' },
      { title: 'Scope & Deliverables', duration: 15, description: 'What are we building exactly? Define what is in scope, what is explicitly out of scope, and what the primary deliverables look like.' },
      { title: 'Roles & Responsibilities', duration: 10, description: 'Assign clear ownership using a RACI or similar framework. Every key workstream and decision should have a named accountable owner.' },
      { title: 'Success Metrics (KPIs)', duration: 10, description: 'Define how project health and success will be measured. Include leading indicators during execution and lagging indicators post-launch.' },
      { title: 'Timeline & Milestones', duration: 10, description: 'Walk through the project roadmap, key milestones, dependencies, and any hard deadlines imposed by external commitments or market windows.' },
    ]
  },
  {
    name: 'Product Roadmap Review',
    description: 'Quarterly alignment session to review progress against roadmap commitments and reprioritize based on new information.',
    items: [
      { title: 'Last Quarter Delivery Review', duration: 15, description: 'Honest assessment of what was shipped vs committed, including features delayed, descoped, or modified. Discuss the impact on downstream dependencies and commitments.' },
      { title: 'Metrics & OKR Progress', duration: 15, description: 'Review product KPIs and quarterly OKR progress. Are leading indicators trending correctly? Where are we off-track and what\'s the hypothesis for why?' },
      { title: 'Market & Competitive Update', duration: 10, description: 'Summarize relevant competitor moves, customer feedback themes, and market shifts that should influence product prioritization this quarter.' },
      { title: 'Next Quarter Roadmap Walkthrough', duration: 20, description: 'Present planned themes and initiatives for the upcoming quarter with clear rationale, expected impact, and confidence level for each commitment.' },
      { title: 'Open Discussion & Reprioritization', duration: 15, description: 'Stakeholders challenge, endorse, or suggest modifications to the plan. Surface any business constraints that should alter sequencing or priorities.' },
      { title: 'Decisions & Communication Plan', duration: 5, description: 'Confirm final roadmap decisions and agree on how changes will be communicated internally to engineering, sales, and customer success teams.' },
    ]
  },
  {
    name: 'Feature Discovery Workshop',
    description: 'Cross-functional workshop to explore a problem space deeply before committing to any solution.',
    items: [
      { title: 'Problem Framing', duration: 15, description: 'Present the user problem with supporting research data, customer quotes, and behavioral evidence. Resist solution framing — keep the focus on the pain point.' },
      { title: 'Assumptions Mapping', duration: 15, description: 'Collectively surface all assumptions the team is making about users, technology, market, and business — then sort them by importance and certainty.' },
      { title: 'Opportunity Exploration', duration: 20, description: 'Divergent brainstorming of ways to address the problem. Use "How Might We" prompts. No filtering yet — volume is the goal at this stage.' },
      { title: 'Solution Sketching', duration: 20, description: 'Each participant sketches a rough solution concept independently. Share and explain each sketch without debate. Focus on understanding, not critique.' },
      { title: 'Prioritization & Next Steps', duration: 10, description: 'Dot-vote on the most promising directions. Define what needs to be validated through prototyping, user research, or technical spikes before investment decisions are made.' },
    ]
  },
  {
    name: 'Go-to-Market (GTM) Planning',
    description: 'Coordinate across product, marketing, sales, and customer success to plan a successful feature or product launch.',
    items: [
      { title: 'Launch Overview & Objectives', duration: 10, description: 'Align on what is launching, the target launch date, primary audience segment, and the top 3 business outcomes the launch is expected to drive.' },
      { title: 'Positioning & Messaging Review', duration: 15, description: 'Review the approved positioning statement, core value propositions, and messaging hierarchy. Ensure alignment across all teams on how to talk about this launch.' },
      { title: 'Channel Strategy', duration: 15, description: 'Discuss which acquisition and engagement channels will be activated: email, in-app, paid, content, PR, partner, and sales outreach. Assign channel owners.' },
      { title: 'Enablement & Training Plan', duration: 10, description: 'Confirm that sales and customer success teams have the collateral, training, FAQs, and demo environments they need to sell and support the new capability.' },
      { title: 'Launch Timeline & Checkpoints', duration: 10, description: 'Walk through the pre-launch, launch day, and post-launch activity calendar. Identify go/no-go criteria and who holds the authority to delay if criteria aren\'t met.' },
      { title: 'Risk & Contingency Planning', duration: 10, description: 'Identify launch risks (technical, competitive, messaging) and define specific contingency actions for each scenario.' },
    ]
  },
  {
    name: 'User Research Readout',
    description: 'Present findings from recent user research and translate insights into actionable product decisions.',
    items: [
      { title: 'Research Context & Objectives', duration: 5, description: 'Remind attendees what questions the research was designed to answer and what decision it was intended to inform.' },
      { title: 'Methodology Overview', duration: 5, description: 'Briefly explain the research method used — interviews, usability tests, surveys, diary studies — participant criteria, sample size, and any important caveats about generalizability.' },
      { title: 'Key Findings', duration: 20, description: 'Present the primary themes and insights with supporting quotes, video clips, or behavioral data. Structure findings around jobs-to-be-done, pain points, and mental models.' },
      { title: 'Implications & Opportunities', duration: 15, description: 'Translate findings into product implications: what should we do differently, what should we build, what should we stop assuming?' },
      { title: 'Open Q&A', duration: 10, description: 'Allow stakeholders to probe the findings, challenge interpretations, or request follow-up research on specific open questions.' },
      { title: 'Decision & Next Steps', duration: 5, description: 'Document which decisions were informed by this research and what follow-up actions or further validation is needed.' },
    ]
  },

  // ─── DESIGN ────────────────────────────────────────────────────────────────
  {
    name: 'Design Review',
    description: 'Gather constructive feedback on UX/UI designs, prototypes, and user flows before handoff to engineering.',
    items: [
      { title: 'Context & Goals', duration: 5, description: 'Remind the room of the user problem being solved and the design principles guiding this work, so feedback stays anchored to what matters.' },
      { title: 'Design Walkthrough', duration: 20, description: 'Walk through current mockups or prototypes in the intended user flow order. Narrate the user\'s experience and highlight key design decisions and their rationale.' },
      { title: 'Structured Feedback', duration: 15, description: 'Gather feedback organized by specific dimensions: usability and clarity, visual hierarchy and branding consistency, edge cases and error states, and accessibility.' },
      { title: 'Synthesis & Action Items', duration: 10, description: 'Categorize feedback as must-fix, should-consider, or out-of-scope. Assign ownership of revisions and define the criteria for the next review.' },
    ]
  },
  {
    name: 'Design System Governance',
    description: 'Maintain and evolve the design system to ensure consistency across products and reduce design debt.',
    items: [
      { title: 'Component Backlog Review', duration: 10, description: 'Review outstanding requests to add, modify, or deprecate design system components. Assess frequency of use, cross-product impact, and urgency.' },
      { title: 'Contribution Proposals', duration: 20, description: 'Teams present components or patterns they\'ve built locally and want to contribute to the shared system. Evaluate for generalizability, accessibility, and token compliance.' },
      { title: 'Breaking Changes Discussion', duration: 15, description: 'Review proposed changes that would break existing implementations. Discuss migration paths, deprecation timelines, and consumer team coordination.' },
      { title: 'Adoption & Usage Metrics', duration: 10, description: 'Review analytics on which components are being used, which are being bypassed, and where design drift is occurring across products.' },
      { title: 'Documentation & Storybook Updates', duration: 5, description: 'Assign owners for updating component documentation, usage guidelines, and Storybook examples for any changes approved in today\'s session.' },
    ]
  },
  {
    name: 'Design Sprint — Day 1: Understand & Define',
    description: 'First day of a Google Design Sprint focused on understanding the problem space and defining a long-term goal.',
    items: [
      { title: 'Sprint Context & Rules', duration: 10, description: 'Set expectations for the week: the Decider role, how decisions are made, the no-device policy during exercises, and the sprint schedule.' },
      { title: 'Expert Interviews', duration: 30, description: 'Rotating 5-minute interviews with internal subject-matter experts — engineering, customer success, sales, data. Capture "How Might We" notes throughout.' },
      { title: 'Long-Term Goal Setting', duration: 15, description: 'The team defines an optimistic 2-year goal: if everything goes right, where will this product be? Frame it as a question the sprint should help answer.' },
      { title: 'Sprint Questions', duration: 15, description: 'Reframe the long-term goal into testable sprint questions. What must be true for the goal to be achieved? What could cause us to fail?' },
      { title: 'Map the Challenge', duration: 20, description: 'Create a simple journey map of the customer experience from left (actors) to right (target outcome). Identify the most critical moment to focus on for the rest of the sprint.' },
    ]
  },

  // ─── LEADERSHIP & MANAGEMENT ───────────────────────────────────────────────
  {
    name: '1-on-1 Coaching',
    description: 'Structured growth-focused individual conversation between a manager and direct report.',
    items: [
      { title: 'Check-in (Pulse)', duration: 5, description: 'Personal wellbeing, energy levels, and morale check before getting into work topics. Creates psychological safety and surfaces hidden stressors.' },
      { title: 'Priority Review', duration: 10, description: 'Review progress on the individual\'s top 3 priorities since the last 1-on-1. Are they moving fast enough? Do they need support or resources?' },
      { title: 'Opportunities & Challenges', duration: 15, description: 'Where is the person stuck, confused, or frustrated? What opportunities are they excited about? How can the manager remove obstacles or open doors?' },
      { title: 'Development Goals', duration: 10, description: 'Check progress on skill development goals. Discuss specific learning opportunities, stretch assignments, or feedback the person has received from peers.' },
      { title: 'Next Actions', duration: 10, description: 'Both manager and direct report state their specific commitments before the next 1-on-1. Document in a shared doc for accountability.' },
    ]
  },
  {
    name: 'Team Health Check',
    description: 'Quarterly structured assessment of team dynamics, morale, and operational effectiveness to surface issues before they become crises.',
    items: [
      { title: 'Wellbeing & Energy Survey Results', duration: 10, description: 'Share aggregated results from a brief pre-meeting survey on workload, morale, and team culture. Present trends over time rather than point-in-time snapshots.' },
      { title: 'What\'s Energizing the Team', duration: 10, description: 'Open discussion of what\'s going well — projects, relationships, processes, or leadership decisions that are making people feel effective and valued.' },
      { title: 'What\'s Draining the Team', duration: 15, description: 'Candid discussion of recurring frustrations, sources of inefficiency, interpersonal friction, or organizational barriers that are depleting team energy.' },
      { title: 'Collaboration & Communication Assessment', duration: 10, description: 'How well is the team working together? Are decisions being made at the right level? Is communication flowing clearly across subteams and with external stakeholders?' },
      { title: 'Improvement Commitments', duration: 10, description: 'Collectively identify 2–3 specific changes to improve team health. Assign owners and define what "done" looks like for each commitment.' },
      { title: 'Leadership Feedback', duration: 5, description: 'Open window for the team to give upward feedback to the manager. Use anonymous cards or direct dialogue depending on team psychological safety.' },
    ]
  },
  {
    name: 'Performance Review Calibration',
    description: 'Calibrate performance ratings across managers to ensure fairness, consistency, and equity in the review cycle.',
    items: [
      { title: 'Calibration Norms & Process', duration: 10, description: 'Review the rating scale definitions, calibration principles (e.g. expected distribution guidelines), and ground rules for the session including confidentiality.' },
      { title: 'Preliminary Ratings Review', duration: 20, description: 'Managers present their proposed ratings for each direct report with supporting evidence. Other managers ask clarifying questions — no lobbying yet, just understanding.' },
      { title: 'Discussion of Edge Cases', duration: 20, description: 'Focus discussion on employees on rating boundaries, high-potential individuals, or cases where managers disagree about appropriate rating. Examine evidence, not impressions.' },
      { title: 'Equity & Bias Check', duration: 15, description: 'Review rating distributions by demographic group to identify potential patterns suggesting unconscious bias. Apply structured de-biasing prompts before finalizing ratings.' },
      { title: 'Final Ratings Confirmation', duration: 10, description: 'Confirm final ratings for all individuals. Document the rationale for any rating changes from the preliminary submissions.' },
      { title: 'Delivery Planning', duration: 5, description: 'Agree on messaging guidance for delivering difficult feedback and for communicating compensation outcomes tied to performance ratings.' },
    ]
  },
  {
    name: 'Hiring Loop Debrief',
    description: 'Structured debrief after a candidate interview loop to reach a hire/no-hire decision with rigor and fairness.',
    items: [
      { title: 'Independent Scorecards First', duration: 5, description: 'Before any discussion, every interviewer submits their written scorecard and recommendation. This prevents anchoring and ensures independent assessment.' },
      { title: 'Scorecard Summary', duration: 5, description: 'Hiring manager summarizes the distribution of hire/no-hire recommendations and flags any significant divergences in assessment that need to be resolved.' },
      { title: 'Attribute-by-Attribute Review', duration: 20, description: 'Walk through each core competency or attribute that was evaluated. Each interviewer shares specific behavioral evidence — quotes, examples, demonstrated reasoning — not gut feelings.' },
      { title: 'Concerns & Red Flags', duration: 10, description: 'Open discussion of any concerns raised by interviewers. Distinguish between dealbreaker gaps and trainable gaps. Evaluate concerns for potential bias.' },
      { title: 'Hire / No-Hire Decision', duration: 10, description: 'Reach a collective decision. In case of split votes, the hiring manager makes the final call using the evidence presented.' },
      { title: 'Next Steps', duration: 5, description: 'If hiring, assign the offer owner and agree on compensation range. If not hiring, confirm who delivers feedback and what the candidate communication will say.' },
    ]
  },
  {
    name: 'Organizational Planning (Org Design)',
    description: 'Leadership session to evaluate current team structure and design future state to match strategic priorities.',
    items: [
      { title: 'Current State Assessment', duration: 15, description: 'Review the current org structure, headcount, spans of control, and reporting lines. Identify where the structure is creating friction or misalignment with strategic goals.' },
      { title: 'Strategic Priorities Alignment', duration: 10, description: 'Restate the business priorities for the next 12–18 months. Ask: does our current structure optimize for these priorities or work against them?' },
      { title: 'Future State Design Options', duration: 25, description: 'Present 2–3 alternative org design options with their respective trade-offs in terms of team cohesion, autonomy, communication overhead, and talent development.' },
      { title: 'Talent & Role Implications', duration: 15, description: 'For each design option, discuss implications for role definitions, career paths, critical talent retention risk, and any headcount changes required.' },
      { title: 'Decision & Transition Plan', duration: 15, description: 'Select the preferred design. Begin drafting the transition sequence, communication strategy, and timeline for implementing changes without disrupting delivery.' },
    ]
  },
  {
    name: 'Skip-Level Listening Session',
    description: 'Open conversation between senior leader and employees two levels below to surface ground-level insights and build trust.',
    items: [
      { title: 'Context Setting', duration: 5, description: 'Leader explains the purpose of the session — genuine listening, not investigation — and sets clear ground rules around confidentiality and follow-through.' },
      { title: 'What\'s Working Well', duration: 15, description: 'Open discussion of what\'s energizing people at work — projects, team culture, leadership behaviors, and tools that are genuinely helping them do their jobs.' },
      { title: 'What Would You Change', duration: 15, description: 'Candid discussion of friction, confusion, or dissatisfaction. Leader listens without defending. Takes notes and asks clarifying questions to fully understand the issue.' },
      { title: 'What Do You Need More Of', duration: 10, description: 'Employees share what support, information, resources, or leadership behaviors would help them be more effective and engaged.' },
      { title: 'Questions for the Leader', duration: 10, description: 'Employees ask questions of the senior leader about business direction, decisions, or concerns they\'ve been unable to get answers to through their direct manager.' },
      { title: 'Commitments & Follow-up', duration: 5, description: 'Leader commits to specific follow-up actions and shares how feedback will be used. Not everything can be fixed, but everything will be acknowledged.' },
    ]
  },

  // ─── STRATEGY & BUSINESS ───────────────────────────────────────────────────
  {
    name: 'Strategy Brainstorm',
    description: 'High-level divergent thinking session for future growth, market positioning, and innovation opportunities.',
    items: [
      { title: 'Inspiration & Data', duration: 10, description: 'Presenting current market trends, competitive landscape, user behavioral data, and analogous industry patterns to provoke thinking.' },
      { title: 'Quiet Ideation', duration: 10, description: 'Individual silent brainstorming using sticky notes or digital tools to generate ideas without the social pressure of group dynamics.' },
      { title: 'Sharing & Clustering', duration: 15, description: 'Each person shares their ideas in round-robin fashion. Group similar ideas into clusters or themes without evaluation.' },
      { title: 'Dot Voting', duration: 5, description: 'Each participant has 5 votes to distribute across ideas they believe have the most strategic merit. No discussion during voting.' },
      { title: 'Refinement', duration: 15, description: 'Dive deep on the top 2–3 ideas. Add specificity: what would this look like, who would it serve, why would it win, and what would it take to execute?' },
    ]
  },
  {
    name: 'Annual Business Planning',
    description: 'Full-day or multi-session annual planning to set company or division goals, budgets, and strategic priorities for the year ahead.',
    items: [
      { title: 'Year in Review', duration: 20, description: 'Honest assessment of the year: revenue performance, product milestones, team growth, culture, and key learnings from what went wrong.' },
      { title: 'Market & Competitive Landscape', duration: 20, description: 'External perspective session: where is the market heading, what are competitors doing, what macro forces will shape the year ahead?' },
      { title: 'Strategic Priorities for the Year', duration: 30, description: 'Leadership team debates and aligns on the top 3–5 strategic priorities that will drive the most important outcomes. Ruthless focus — not everything can be priority one.' },
      { title: 'Goal-Setting (OKR / KPI Definition)', duration: 30, description: 'Translate strategic priorities into measurable annual goals with quarterly checkpoints. Assign executive sponsors and confirm accountability.' },
      { title: 'Resource Allocation Discussion', duration: 25, description: 'High-level discussion of how headcount, budget, and leadership attention will be distributed across the strategic priorities.' },
      { title: 'Risks & Contingencies', duration: 15, description: 'Identify the top 5 risks to the plan and define early warning indicators and mitigation strategies for each.' },
      { title: 'Communication & Cascading Plan', duration: 10, description: 'Agree on how the plan will be communicated to the broader organization, what level of detail will be shared, and the timeline for cascading goals to teams.' },
    ]
  },
  {
    name: 'OKR Setting Session',
    description: 'Team-level OKR definition workshop to create ambitious, measurable, and aligned quarterly objectives.',
    items: [
      { title: 'Company OKR Context', duration: 10, description: 'Review the company-level OKRs for the quarter to ensure team objectives are clearly contributing to the broader organizational priorities.' },
      { title: 'Draft Objective Discussion', duration: 15, description: 'Teams share their proposed objectives. Evaluate each against criteria: is it inspirational, qualitative, time-bound, and clearly linked to company strategy?' },
      { title: 'Key Results Definition', duration: 20, description: 'For each accepted objective, define 3–5 measurable key results. Challenge each KR: is it a leading indicator of success, or a lagging output? Is it truly measurable?' },
      { title: 'Confidence & Stretch Calibration', duration: 10, description: 'Rate confidence in achieving each KR on a 0–1 scale. OKRs should feel ambitious — a 0.7 confidence score is the sweet spot. Adjust if confidence is too high or too low.' },
      { title: 'Cross-Team Dependencies', duration: 10, description: 'Identify which OKRs depend on other teams\' outputs or decisions. Flag these for explicit alignment conversations before the quarter begins.' },
      { title: 'Finalization & Sharing Plan', duration: 5, description: 'Confirm final OKRs and agree on how they will be shared with the broader team, how progress will be tracked, and the cadence of OKR check-ins.' },
    ]
  },
  {
    name: 'Competitive Analysis Workshop',
    description: 'Structured session to deeply analyze the competitive landscape and extract strategic insights for product and GTM decisions.',
    items: [
      { title: 'Competitive Set Definition', duration: 10, description: 'Agree on which competitors to analyze in depth (direct, indirect, and adjacent). Discuss the risk of spending too much time on the wrong competitors.' },
      { title: 'Feature & Capability Matrix Review', duration: 20, description: 'Walk through a pre-prepared competitive matrix covering core product capabilities, pricing, target segments, and key differentiators. Challenge assumptions with recent data.' },
      { title: 'Customer Perception Analysis', duration: 15, description: 'Review win/loss interview data, G2 or Capterra reviews, and sales team feedback to understand how customers perceive us vs competitors in the real world.' },
      { title: 'Competitor Strategy Inference', duration: 15, description: 'Based on product roadmap signals, hiring patterns, funding, and marketing moves — what strategic direction does each key competitor appear to be heading?' },
      { title: 'Our Competitive Response', duration: 15, description: 'Discuss how insights should influence our product roadmap, positioning, pricing, and sales enablement. Where should we compete head-to-head vs where should we differentiate?' },
      { title: 'Ongoing Intelligence Process', duration: 5, description: 'Assign ownership of competitive monitoring. Define cadence for updates and the channels through which competitive intel will be shared across sales, product, and marketing.' },
    ]
  },
  {
    name: 'Partnership Evaluation Meeting',
    description: 'Evaluate a potential strategic or technology partnership for fit, risk, and mutual value creation.',
    items: [
      { title: 'Partnership Overview', duration: 10, description: 'Present background on the potential partner: company profile, product overview, market position, and the initial opportunity or approach that prompted this evaluation.' },
      { title: 'Strategic Fit Assessment', duration: 15, description: 'Assess alignment on target customer segments, go-to-market motion, company values, and how the partnership would accelerate our strategic priorities.' },
      { title: 'Value Creation Analysis', duration: 15, description: 'Quantify the mutual value: what do we gain (reach, capability, revenue, brand)? What do they gain? Is the exchange of value equitable and sustainable?' },
      { title: 'Risk & Dependency Evaluation', duration: 15, description: 'Identify partnership risks including competitive conflict, customer data sharing, exclusivity obligations, and what happens if the relationship breaks down.' },
      { title: 'Integration & Operational Requirements', duration: 10, description: 'Assess the technical, legal, and operational work required to make the partnership functional — API integrations, co-marketing obligations, SLA requirements.' },
      { title: 'Decision & Next Steps', duration: 5, description: 'Reach a go/no-go decision on advancing discussions. If go, assign an owner and define the next milestone: a term sheet, a pilot proposal, or a technical discovery session.' },
    ]
  },

  // ─── SALES & REVENUE ───────────────────────────────────────────────────────
  {
    name: 'Weekly Sales Pipeline Review',
    description: 'Structured review of the sales pipeline to forecast accurately, identify at-risk deals, and allocate sales management attention.',
    items: [
      { title: 'Pipeline Health Dashboard', duration: 10, description: 'Review aggregate pipeline metrics: total pipeline value, pipeline coverage ratio, average deal size, and pipeline by stage and segment.' },
      { title: 'Deal-by-Deal Stage Review', duration: 20, description: 'Walk through active opportunities by deal stage. For each significant deal, assess: what\'s the current situation, what\'s the next action, and is the close date still realistic?' },
      { title: 'At-Risk Deal Identification', duration: 10, description: 'Flag deals that have stalled, have no recent activity, or show warning signs of churn. Discuss specific recovery actions and timelines.' },
      { title: 'Forecast Commit vs Upside', duration: 10, description: 'Each rep commits to a number they\'re confident they\'ll close this period and identifies upside deals that could come in. Build a total forecast from individual commitments.' },
      { title: 'Coaching & Deal Strategy', duration: 10, description: 'Manager provides specific coaching on 1–2 strategic deals: competitive approach, executive access, proposal framing, or champion development.' },
    ]
  },
  {
    name: 'Sales Kick-Off (SKO) Planning',
    description: 'Internal planning session to design the agenda and content for the annual sales kick-off event.',
    items: [
      { title: 'SKO Objectives', duration: 10, description: 'Define the top 3 outcomes we need the sales team to leave the SKO with: new messaging internalized, new product knowledge, cultural alignment, or a specific skill developed.' },
      { title: 'Agenda Structure', duration: 20, description: 'Design the day-by-day agenda balancing keynotes, breakout sessions, product training, customer panels, and social/team-building activities.' },
      { title: 'Content & Speaker Assignments', duration: 15, description: 'Assign content owners for each session. Review who the most effective internal presenters are and where external speakers or customer voices would add credibility.' },
      { title: 'Logistics & Venue', duration: 10, description: 'Review venue, A/V requirements, catering, accommodation, and any pre-work assignments reps should complete before arriving.' },
      { title: 'Budget Review', duration: 10, description: 'Review budget allocation across venue, content production, travel, and activities. Identify any items over budget and trade-offs to make.' },
      { title: 'Success Metrics for SKO', duration: 5, description: 'How will we know if the SKO achieved its objectives? Define post-event survey metrics, knowledge check scores, or pipeline activity targets to measure impact.' },
    ]
  },
  {
    name: 'Account Executive Deal Review',
    description: 'Deep-dive strategy session on a specific high-value deal with a senior sales leader or executive sponsor.',
    items: [
      { title: 'Deal Background', duration: 5, description: 'AE provides context: company profile, how the opportunity originated, current champion, key stakeholders, and the business problem being solved.' },
      { title: 'Buyer Map & Power Analysis', duration: 10, description: 'Map all decision-makers, influencers, and gatekeepers. Assess current sentiment (promoter, neutral, detractor) for each and identify gaps in executive access.' },
      { title: 'Competitive Situation', duration: 10, description: 'Who else is in the deal? What is the customer saying about competitors? Where are we winning and where are we at risk based on the most recent signals?' },
      { title: 'Deal Risk Assessment', duration: 10, description: 'Identify the top 3 risks to closing this deal — technical, political, budget, timeline, or process — and the specific action to mitigate each.' },
      { title: 'Winning Strategy', duration: 15, description: 'Define the deal strategy: unique value angle, proof points to deploy, executive sponsor actions, and the specific sequence of next steps to advance to close.' },
      { title: 'Action Items & Owner', duration: 5, description: 'Confirm the next 3 actions with owners and dates. Include any executive sponsor commitments made in this session.' },
    ]
  },
  {
    name: 'Customer Renewal Review',
    description: 'Internal preparation session before a customer renewal conversation to align on strategy, risks, and value positioning.',
    items: [
      { title: 'Account Health Overview', duration: 10, description: 'Review usage data, adoption metrics, support ticket history, and NPS or CSAT scores. Assess the overall health of the customer relationship going into renewal.' },
      { title: 'Value Delivered Summary', duration: 10, description: 'Compile evidence of ROI delivered during the contract period: time saved, revenue generated, costs reduced, or strategic goals achieved with our product.' },
      { title: 'Expansion Opportunities', duration: 10, description: 'Identify upsell or cross-sell opportunities based on usage patterns, organizational growth, or new product capabilities relevant to their use case.' },
      { title: 'Renewal Risk Assessment', duration: 10, description: 'What are the risk factors for churn or contraction? Budget pressures, champion turnover, competitive interest, or dissatisfaction with specific features?' },
      { title: 'Renewal Strategy & Negotiation Preparation', duration: 10, description: 'Define our pricing strategy, concession ladder, and the narrative arc for the renewal conversation. Who needs to be in the room on their side?' },
      { title: 'Next Steps', duration: 5, description: 'Confirm who will lead the renewal conversation, when it will happen, and what pre-meeting preparation or materials need to be sent in advance.' },
    ]
  },

  // ─── CUSTOMER SUCCESS & SUPPORT ────────────────────────────────────────────
  {
    name: 'Customer Onboarding Kickoff',
    description: 'First meeting with a new customer after contract signing to establish trust, set expectations, and launch the onboarding journey.',
    items: [
      { title: 'Welcome & Team Introductions', duration: 5, description: 'Introduce the full customer success and onboarding team. Customers share their internal team members who will be involved in the implementation.' },
      { title: 'Customer Goals & Success Criteria', duration: 15, description: 'Ask the customer to articulate what success looks like for them in 30, 60, and 90 days. Document specific business outcomes, not feature adoption metrics.' },
      { title: 'Onboarding Plan Walkthrough', duration: 20, description: 'Walk through the structured onboarding journey including phases, milestones, training schedule, and any technical implementation requirements.' },
      { title: 'Stakeholder Alignment', duration: 10, description: 'Identify all stakeholders on the customer side who need to be involved or informed at each phase. Establish communication cadence and escalation path.' },
      { title: 'First-Week Action Items', duration: 10, description: 'Define the specific actions each party will take in the first 7 days. Confirm access provisioning, data migration needs, and any pre-work required from the customer.' },
    ]
  },
  {
    name: 'Quarterly Business Review (QBR)',
    description: 'Strategic review meeting with a key customer to assess value delivered, progress toward goals, and plan for the next quarter.',
    items: [
      { title: 'Relationship & Health Check-in', duration: 10, description: 'Open with a candid relationship temperature check. How is the customer feeling about the partnership overall? Surface any concerns before diving into metrics.' },
      { title: 'Goal Progress Review', duration: 15, description: 'Review the success metrics established at onboarding or the previous QBR. Show quantitative progress and contextualize results against the customer\'s stated goals.' },
      { title: 'Usage & Adoption Insights', duration: 15, description: 'Share product usage data: which teams are active, which features are underutilized, and where there are adoption gaps that represent untapped value.' },
      { title: 'Product Roadmap Update', duration: 10, description: 'Share relevant upcoming product features and ask for customer input on priorities. Demonstrate that their feedback has influenced the roadmap where applicable.' },
      { title: 'Challenges & Action Items', duration: 10, description: 'Discuss any ongoing challenges or open support issues. Commit to specific resolutions with timelines.' },
      { title: 'Next Quarter Planning', duration: 10, description: 'Collaboratively set goals and priorities for the next quarter. Identify expansion opportunities or additional use cases to explore.' },
    ]
  },
  {
    name: 'Voice of the Customer (VoC) Synthesis',
    description: 'Internal session to synthesize customer feedback signals from multiple channels into actionable insights for product and business teams.',
    items: [
      { title: 'Feedback Sources Overview', duration: 5, description: 'Review what feedback channels are being captured: support tickets, NPS surveys, QBR notes, churn interviews, sales call recordings, and G2 reviews.' },
      { title: 'Top Themes This Quarter', duration: 20, description: 'Present the top 5–8 recurring themes from customer feedback. For each theme, share representative quotes, frequency data, and the customer segments most affected.' },
      { title: 'Sentiment Trend Analysis', duration: 10, description: 'Show how sentiment has changed over the quarter. Which themes are getting worse vs improving? What correlates with changes in NPS or churn rate?' },
      { title: 'Impact on Roadmap Priorities', duration: 15, description: 'Facilitate discussion on which feedback themes should influence immediate product decisions, which belong on the long-term roadmap, and which reflect gaps in onboarding or documentation.' },
      { title: 'Action Item Assignment', duration: 10, description: 'Assign owners from product, customer success, and support for specific follow-up actions. Define what closed-loop feedback to customers looks like.' },
    ]
  },

  // ─── MARKETING ─────────────────────────────────────────────────────────────
  {
    name: 'Content Calendar Planning',
    description: 'Monthly or quarterly planning session to align content themes, formats, channels, and ownership across the marketing team.',
    items: [
      { title: 'Performance Review of Previous Period', duration: 15, description: 'Review content performance metrics: traffic, engagement, conversion, and pipeline influence. Identify what performed above or below expectations and why.' },
      { title: 'Upcoming Campaign Themes', duration: 10, description: 'Review the broader marketing calendar — product launches, events, seasonal moments — and define the overarching content themes that will support each campaign.' },
      { title: 'Channel Strategy & Formats', duration: 15, description: 'For each theme, discuss which channels (blog, LinkedIn, email, YouTube, podcast) and formats (long-form, video, infographic, case study) are most appropriate.' },
      { title: 'Content Assignments & Deadlines', duration: 15, description: 'Assign specific content pieces to owners with draft deadlines, review deadlines, and publish dates. Confirm capacity and flag any resourcing gaps.' },
      { title: 'SEO & Distribution Strategy', duration: 10, description: 'Review keyword targeting for planned pieces and discuss amplification strategy: paid promotion, newsletter inclusion, partner co-distribution, and employee advocacy.' },
      { title: 'Calendar Finalization', duration: 5, description: 'Confirm the full content calendar is populated in the shared planning tool and all owners have acknowledged their commitments.' },
    ]
  },
  {
    name: 'Campaign Post-Mortem',
    description: 'Structured debrief after a marketing campaign to capture learnings and improve future campaign performance.',
    items: [
      { title: 'Campaign Overview Recap', duration: 5, description: 'Briefly recap the campaign objectives, target audience, channels used, timeframe, and budget invested as context for the performance discussion.' },
      { title: 'Results vs Goals', duration: 15, description: 'Compare actual campaign performance against every defined KPI: reach, engagement rate, lead volume, pipeline generated, cost per lead, and revenue influenced.' },
      { title: 'What Worked', duration: 10, description: 'Discuss the creative decisions, channel choices, messaging angles, or targeting approaches that outperformed expectations and should be repeated.' },
      { title: 'What Didn\'t Work', duration: 15, description: 'Honest discussion of underperforming elements. Separate execution issues from strategy issues. Did the hypothesis fail, or was the execution of a good hypothesis poor?' },
      { title: 'Learnings & Recommendations', duration: 10, description: 'Translate findings into specific, actionable recommendations for the next campaign. Document in a shared learnings repository for future campaign planners.' },
      { title: 'Budget & Attribution Accuracy', duration: 5, description: 'Review whether attribution was captured correctly. Were all spend and conversions tracked? Are there improvements needed to measurement infrastructure?' },
    ]
  },
  {
    name: 'Brand Workshop',
    description: 'Workshop to define, refine, or realign brand identity including positioning, voice, visual identity, and values.',
    items: [
      { title: 'Brand Audit Presentation', duration: 15, description: 'Review current brand usage in the wild: website, ads, social, sales decks, email. Identify inconsistencies, off-brand moments, and areas of strong brand expression.' },
      { title: 'Target Audience Portraits', duration: 15, description: 'Review persona or ICP profiles and discuss how the brand should make each audience segment feel. Brand perception should differ by audience — but feel coherent.' },
      { title: 'Brand Positioning Statement', duration: 20, description: 'Using the positioning framework (For X who Y, our brand is Z that W, unlike competitors), draft or critique the current brand positioning statement as a group.' },
      { title: 'Voice & Tone Calibration', duration: 15, description: 'Review brand voice attributes. Use real writing examples to calibrate where the voice should sit on spectrums: formal/casual, bold/measured, expert/approachable.' },
      { title: 'Visual Identity Review', duration: 10, description: 'Assess color palette, typography, imagery style, and logo usage consistency. Identify what elements feel dated, off-strategy, or inconsistently applied.' },
      { title: 'Next Steps & Ownership', duration: 5, description: 'Assign brand guideline update ownership, identify which assets need immediate revision, and set a review date for updated brand documentation.' },
    ]
  },

  // ─── FINANCE & OPERATIONS ──────────────────────────────────────────────────
  {
    name: 'Monthly Financial Review',
    description: 'Executive team review of monthly financial results against budget and forecast.',
    items: [
      { title: 'Revenue Performance', duration: 15, description: 'Review total revenue vs budget and prior month. Break down by segment, product, channel, and geography. Discuss significant variances and their root causes.' },
      { title: 'Gross Margin Analysis', duration: 10, description: 'Review gross margin vs plan. Identify any COGS movements, infrastructure cost changes, or customer mix shifts affecting margin performance.' },
      { title: 'Operating Expense Review', duration: 15, description: 'Review total OpEx vs budget by department. Identify departments over or under budget and the specific drivers. Discuss any accruals or one-time items.' },
      { title: 'Cash Flow & Runway', duration: 10, description: 'Review operating cash flow, ending cash position, and runway projection. Discuss any significant cash movements expected in the next 30–60 days.' },
      { title: 'Updated Forecast', duration: 10, description: 'Present revised full-year forecast based on current month actuals. Quantify upside and downside scenarios with specific drivers for each.' },
      { title: 'Key Decisions Required', duration: 10, description: 'Surface any financial decisions that need executive team input this month: budget reallocations, hiring freezes, capex approvals, or pricing changes.' },
    ]
  },
  {
    name: 'Vendor Evaluation & Selection',
    description: 'Structured session to evaluate competing vendors against defined criteria and reach a selection decision.',
    items: [
      { title: 'Evaluation Criteria Review', duration: 10, description: 'Confirm the weighted criteria matrix used to evaluate vendors: functionality, total cost, integration complexity, vendor stability, support quality, and security posture.' },
      { title: 'Vendor Scorecards Presentation', duration: 25, description: 'Walk through each vendor\'s scorecard. Each evaluator shares their assessment with specific evidence: demo observations, reference call feedback, security questionnaire results.' },
      { title: 'Pricing & TCO Comparison', duration: 15, description: 'Compare total cost of ownership across vendors including implementation, training, support tiers, and projected contract ramp costs over 3 years.' },
      { title: 'Risk Assessment by Vendor', duration: 10, description: 'Evaluate vendor-specific risks: financial stability, product roadmap alignment, contractual flexibility, and references from similar-sized customers.' },
      { title: 'Decision & Negotiation Strategy', duration: 10, description: 'Select the preferred vendor or agree on a shortlist. Define negotiation targets: pricing, contract length, SLA terms, implementation support, and exit clauses.' },
    ]
  },
  {
    name: 'Business Continuity Planning (BCP) Review',
    description: 'Annual review of business continuity plans to ensure they are current, tested, and executable in a real crisis.',
    items: [
      { title: 'BCP Overview & Scope', duration: 10, description: 'Review which business functions and systems are covered by the current BCP. Confirm coverage gaps haven\'t emerged from organizational or technology changes in the past year.' },
      { title: 'Risk Scenario Review', duration: 15, description: 'Walk through the top risk scenarios the BCP is designed to address: natural disaster, cyberattack, key personnel loss, supply chain failure, and critical system outage.' },
      { title: 'Last Tabletop Exercise Results', duration: 15, description: 'Review findings from the most recent tabletop exercise or actual incident: what worked, what failed, what was missing from the plan during execution.' },
      { title: 'Plan Updates Required', duration: 15, description: 'Identify specific sections of the BCP that need updating due to org changes, technology changes, or lessons learned. Assign update owners and deadlines.' },
      { title: 'Testing Schedule', duration: 10, description: 'Agree on the cadence and format of BCP tests for the coming year: tabletop exercises, simulation drills, and any third-party audit requirements.' },
      { title: 'Executive Awareness & Sign-Off', duration: 5, description: 'Confirm executive sponsor review and formal endorsement of the updated BCP. Document approval for audit and compliance purposes.' },
    ]
  },

  // ─── PEOPLE & HR ───────────────────────────────────────────────────────────
  {
    name: 'All-Hands / Town Hall',
    description: 'Company-wide meeting to share strategic direction, celebrate wins, build culture, and facilitate open dialogue between leadership and the full team.',
    items: [
      { title: 'Welcome & Agenda Overview', duration: 5, description: 'CEO or host sets the tone, welcomes new joiners since the last all-hands, and frames what the team will experience in the session.' },
      { title: 'Company Performance Update', duration: 15, description: 'Review company metrics against goals: revenue, growth rate, product adoption, customer satisfaction, and key operational indicators. Be transparent about performance vs plan.' },
      { title: 'Strategic Focus Areas', duration: 15, description: 'Leadership shares what the company is doubling down on this quarter and why. Connect strategic choices to the company mission and the competitive reality.' },
      { title: 'Team & Culture Highlights', duration: 10, description: 'Celebrate team accomplishments, recognize individual contributors, welcome new team members, and share relevant culture or DEI updates.' },
      { title: 'Roadmap or Product Spotlight', duration: 10, description: 'Brief product or roadmap update to keep the whole company aligned on what\'s being built and why customers will care.' },
      { title: 'Open Q&A', duration: 15, description: 'Anonymous question submission followed by live CEO/leadership responses. Prioritize hard questions — visible candor builds significantly more trust than softball answers.' },
    ]
  },
  {
    name: 'New Employee Onboarding: Week 1 Check-In',
    description: 'Structured first-week check-in between a new hire and their manager to surface early concerns and set a foundation for success.',
    items: [
      { title: 'First Impressions', duration: 10, description: 'Ask the new hire to share their honest first impressions of the team, culture, tools, and onboarding experience so far. Listen without defensiveness.' },
      { title: 'Role Clarity Check', duration: 10, description: 'Confirm the new hire\'s understanding of their core responsibilities, immediate priorities, and what success looks like in their first 30–60–90 days.' },
      { title: 'Tools & Access Review', duration: 5, description: 'Confirm the new hire has access to all systems, tools, and documentation they need. Surface any access blockers or gaps in the onboarding setup.' },
      { title: 'Relationships & Navigation', duration: 10, description: 'Discuss who the key people are that the new hire should build relationships with. Are there any important relationships or cultural dynamics they should understand?' },
      { title: 'Questions & Concerns', duration: 10, description: 'Open space for the new hire to ask any questions they\'ve been hesitant to raise, or share concerns that haven\'t fit naturally into other onboarding conversations.' },
      { title: 'Manager Commitments', duration: 5, description: 'Manager explicitly commits to the specific support they will provide in week 2: introductions to make, context to share, decisions to unblock.' },
    ]
  },
  {
    name: 'Compensation Benchmarking Review',
    description: 'HR and finance review of market compensation data to ensure pay practices are competitive and equitable across the organization.',
    items: [
      { title: 'Methodology & Data Sources', duration: 10, description: 'Review the compensation benchmarking sources used: Radford, Levels.fyi, Mercer, Carta, or other surveys. Discuss sample quality, recency, and relevance to company stage and geography.' },
      { title: 'Market Positioning Review', duration: 15, description: 'Review the company\'s current stated compensation philosophy (e.g. 50th, 75th percentile of market) and assess whether current pay ranges are still achieving that positioning.' },
      { title: 'Role-Level Analysis', duration: 20, description: 'Walk through compensation data for each job family and level. Identify roles where current ranges are below market, above market, or where data is thin.' },
      { title: 'Pay Equity Analysis', duration: 15, description: 'Review statistical analysis of pay gaps by gender, race, and other protected characteristics within levels and job families. Identify unexplained gaps requiring remediation.' },
      { title: 'Recommended Range Updates', duration: 10, description: 'Propose specific updates to compensation bands based on market data and equity analysis. Estimate cost of range adjustments and merit budget implications.' },
      { title: 'Communication & Implementation Plan', duration: 5, description: 'Discuss how updated ranges will be rolled out, who will be notified about their positioning, and how managers will be equipped to have compensation conversations.' },
    ]
  },
  {
    name: 'DEI Strategy Session',
    description: 'Structured session to review progress on diversity, equity, and inclusion commitments and plan impactful next steps.',
    items: [
      { title: 'Representation Data Review', duration: 15, description: 'Review current workforce composition by gender, race/ethnicity, disability status, and other relevant dimensions across levels and departments. Track change vs prior period.' },
      { title: 'Hiring Funnel Analysis', duration: 15, description: 'Review candidate pipeline data by demographic group at each stage of the hiring funnel. Identify where diverse candidates are dropping off and what\'s driving it.' },
      { title: 'Inclusion & Belonging Survey Results', duration: 10, description: 'Share results from the most recent inclusion survey. Focus on whether specific groups are experiencing meaningfully different belonging and psychological safety scores.' },
      { title: 'Program Review', duration: 15, description: 'Assess current DEI programs: ERGs, mentoring initiatives, inclusive hiring training, and pay equity reviews. Which are showing measurable impact and which are activity without outcomes?' },
      { title: 'Priority Actions for Next Quarter', duration: 15, description: 'Define the top 3 DEI priorities for the next quarter with clear owners, measurable success criteria, and resource requirements.' },
      { title: 'Leadership Accountability', duration: 5, description: 'Review how DEI progress is tied to leadership performance metrics. Are executives held accountable in a meaningful way for outcomes in their organizations?' },
    ]
  },

  // ─── CROSS-FUNCTIONAL ──────────────────────────────────────────────────────
  {
    name: 'Executive Steering Committee',
    description: 'Senior leadership checkpoint for a major initiative to review status, resolve escalations, and make high-stakes decisions.',
    items: [
      { title: 'Initiative Status Dashboard', duration: 10, description: 'Program lead presents a one-page status summary: RAG status for scope, schedule, budget, and risk. No narrative — just the dashboard with data.' },
      { title: 'Key Accomplishments Since Last Meeting', duration: 5, description: 'Brief summary of milestones achieved, decisions made, and significant risks closed since the previous steering committee meeting.' },
      { title: 'Critical Issues & Escalations', duration: 20, description: 'Detailed discussion of issues that require steering committee awareness or decision. For each: describe the issue, the options available, and the recommendation.' },
      { title: 'Upcoming Milestones & Risks', duration: 15, description: 'Preview the next 30–60 days of critical milestones. For each top risk, review current mitigation status and whether additional executive action is needed.' },
      { title: 'Decision Register Review', duration: 5, description: 'Review decisions made in this meeting and confirm each is documented, with owner and communication plan. Review status of prior steering committee decisions.' },
      { title: 'Next Meeting Date & Pre-work', duration: 5, description: 'Confirm next meeting date and any pre-read materials that should be distributed in advance to ensure efficient use of steering committee time.' },
    ]
  },
  {
    name: 'Cross-Functional Initiative Launch',
    description: 'Kickoff meeting for an initiative requiring sustained collaboration across multiple teams and functions.',
    items: [
      { title: 'Why This Initiative, Why Now', duration: 10, description: 'Sponsor presents the business context: the problem or opportunity, why it\'s urgent enough to warrant cross-functional investment, and what happens if we don\'t act.' },
      { title: 'Initiative Scope & Out-of-Scope', duration: 10, description: 'Clearly define what this initiative will and will not address. Explicit out-of-scope items prevent scope creep and manage expectations across functions.' },
      { title: 'Team Introductions & Roles', duration: 10, description: 'Each function introduces their representative and clarifies their role in the initiative: decision-maker, contributor, informed stakeholder, or approver.' },
      { title: 'Governance & Decision-Making Model', duration: 10, description: 'Define how decisions will be made: who can make which decisions autonomously, what requires cross-team consensus, and what needs escalation to the sponsor.' },
      { title: 'Workstream Overview', duration: 15, description: 'Walk through the major workstreams, initial owners, key dependencies between workstreams, and how progress will be tracked and reported.' },
      { title: 'Risk Identification', duration: 10, description: 'Open brainstorm of the top risks from each function\'s perspective. Catalog them in the risk register and assign initial risk owners.' },
      { title: 'First Actions & Communication Plan', duration: 5, description: 'Define immediate next steps and confirm the standing meeting cadence. Agree on how initiative updates will be communicated to broader stakeholders.' },
    ]
  },
  {
    name: 'Crisis Management War Room',
    description: 'Urgent response meeting during an active business, technical, or reputational crisis requiring rapid coordinated action.',
    items: [
      { title: 'Situation Briefing', duration: 10, description: 'Incident commander delivers a rapid briefing: what happened, when, current state of the situation, and what is known vs unknown. Facts only — no speculation.' },
      { title: 'Impact Assessment', duration: 10, description: 'Quantify known impact: affected customers or systems, financial exposure, reputational risk, regulatory implications, and cascading downstream effects.' },
      { title: 'Immediate Actions Review', duration: 10, description: 'Review actions already taken since the crisis began. Confirm they are still appropriate given evolving situation. Identify any containment actions that must happen now.' },
      { title: 'Workstream Assignments', duration: 10, description: 'Assign leads for each active workstream: technical remediation, customer communication, media/PR, legal, and executive escalation. Confirm resource availability.' },
      { title: 'Communication Plan', duration: 10, description: 'Draft or review internal and external communications. Define who approves external statements, what will be said and not said, and what the communication cadence will be.' },
      { title: 'Next Checkpoint', duration: 5, description: 'Define the next war room checkpoint time — typically 2–4 hours. Confirm what each workstream lead will report back on and the criteria for de-escalating the war room.' },
      { title: 'Unresolved Questions', duration: 5, description: 'Surface open questions that don\'t have answers yet. Assign owners to find answers before the next checkpoint to avoid decision-making with incomplete information.' },
    ]
  },
  {
    name: 'Innovation Lab / Hackathon Kickoff',
    description: 'Launch session for an internal hackathon or innovation sprint to inspire teams and set clear challenge parameters.',
    items: [
      { title: 'Challenge Statement', duration: 10, description: 'Leadership presents the innovation challenge: the problem space, constraints, and the type of solutions that would be most valuable. Leave room for creative interpretation.' },
      { title: 'Rules & Judging Criteria', duration: 10, description: 'Explain participation rules, team formation constraints, submission requirements, and the criteria judges will use to evaluate submissions — novelty, feasibility, impact, presentation quality.' },
      { title: 'Resource Overview', duration: 5, description: 'Introduce available tools, APIs, data sets, compute resources, mentors, and any budget allocated for prototyping. Clarify what teams can and cannot use.' },
      { title: 'Team Formation', duration: 10, description: 'Facilitate team formation. Encourage cross-functional diversity. Ensure every participant has a team and each team has a mix of relevant skills.' },
      { title: 'Mentor Introductions', duration: 5, description: 'Introduce subject-matter mentors and explain how teams can access them during the hackathon period for technical, design, or business model guidance.' },
      { title: 'Problem Exploration Time', duration: 20, description: 'Structured time for teams to frame their chosen problem, define their hypothesis, and sketch an initial approach before the hacking begins.' },
    ]
  },
  {
    name: 'Lessons Learned Review (Project Close)',
    description: 'Structured retrospective at the conclusion of a project to capture institutional knowledge and improve future project execution.',
    items: [
      { title: 'Project Summary', duration: 10, description: 'Brief recap of the project: objectives, final deliverables, timeline performance, budget vs actual, and overall outcome quality assessment.' },
      { title: 'What We Would Do the Same', duration: 10, description: 'Discuss practices, decisions, and team behaviors that contributed to project success and should be deliberately repeated in future projects.' },
      { title: 'What We Would Do Differently', duration: 20, description: 'Honest discussion of decisions, processes, tools, and communication patterns that created waste, delay, rework, or friction — and what should change next time.' },
      { title: 'Unexpected Challenges', duration: 10, description: 'Surface surprises that the team didn\'t anticipate in planning: technical discoveries, stakeholder behavior, external dependencies, or market changes that affected execution.' },
      { title: 'Knowledge Capture', duration: 10, description: 'Identify institutional knowledge that exists only in people\'s heads and needs to be documented: technical decisions made, architectural patterns applied, customer insights discovered.' },
      { title: 'Recommendations for Future Projects', duration: 10, description: 'Synthesize the discussion into 5–10 specific recommendations. Document in a shared project playbook or wiki so future project leads can benefit.' },
    ]
  },

  // ─── DATA & ANALYTICS ──────────────────────────────────────────────────────
  {
    name: 'Data Quality Review',
    description: 'Regular review of data pipeline health, data quality issues, and the impact of data problems on downstream business decisions.',
    items: [
      { title: 'Data Quality Dashboard Walkthrough', duration: 10, description: 'Review automated data quality metrics: completeness, accuracy, timeliness, and consistency scores across critical data domains and pipelines.' },
      { title: 'Active Data Issues', duration: 15, description: 'Walk through open data quality incidents: what data is affected, which business teams or reports are impacted, and current resolution status.' },
      { title: 'Root Cause Analysis on Top Issues', duration: 15, description: 'For the 2–3 most impactful recurring data issues, conduct root cause analysis and discuss whether the fix should be upstream prevention or downstream remediation.' },
      { title: 'Business Impact Assessment', duration: 10, description: 'Evaluate whether any data quality issues have led to incorrect decisions, inaccurate reporting, or customer-facing data errors. Quantify impact where possible.' },
      { title: 'Prevention & Monitoring Improvements', duration: 10, description: 'Discuss new data quality checks, schema validations, or alerting rules that should be implemented to detect future issues earlier.' },
    ]
  },
  {
    name: 'Analytics Request Prioritization',
    description: 'Weekly or bi-weekly session to triage incoming analytics requests and align on data team priorities.',
    items: [
      { title: 'New Request Review', duration: 15, description: 'Walk through analytics requests received since the last session. For each: understand the business question, the decision it will inform, and the urgency from the requestor\'s perspective.' },
      { title: 'Impact & Effort Assessment', duration: 10, description: 'Score each request on business impact (how important is the decision?) and analytical effort (complexity of the analysis). Surface any quick wins.' },
      { title: 'Dependency & Feasibility Check', duration: 10, description: 'For high-priority requests, confirm whether the required data exists, is clean, and is accessible. Flag data gaps that need to be addressed before the analysis can begin.' },
      { title: 'Priority Queue Finalization', duration: 10, description: 'Using the impact/effort scoring, finalize the prioritized work queue for the coming period. Confirm each item has an assigned analyst and a target completion date.' },
      { title: 'Stakeholder Communication', duration: 5, description: 'Confirm how requestors will be notified of timelines and any cases where requests are deferred or require scope conversation before work begins.' },
    ]
  },

  // ─── SECURITY & COMPLIANCE ─────────────────────────────────────────────────
  {
    name: 'Security Threat Review',
    description: 'Recurring security team meeting to review the current threat landscape, active vulnerabilities, and prioritize remediation efforts.',
    items: [
      { title: 'Threat Intelligence Briefing', duration: 10, description: 'Security team shares updates on relevant threat actor activity, newly disclosed CVEs affecting the tech stack, and any industry-specific threat intelligence from the past period.' },
      { title: 'Vulnerability Scan Results', duration: 15, description: 'Review output from automated vulnerability scans. Triage new findings by CVSS score, exploitability, and business impact. Confirm which findings are false positives.' },
      { title: 'Remediation Status Update', duration: 15, description: 'Review progress on previously assigned remediation tasks. Identify any items past their SLA deadline and discuss whether to escalate or extend.' },
      { title: 'Penetration Test Findings Review', duration: 15, description: 'If a recent pen test was conducted, walk through findings by severity. For each critical or high finding, confirm ownership and remediation timeline.' },
      { title: 'Security Metrics Review', duration: 5, description: 'Review security KPIs: mean time to detect, mean time to remediate, patch compliance rate, and security training completion rate across the organization.' },
    ]
  },
  {
    name: 'GDPR / Privacy Compliance Review',
    description: 'Quarterly review of data privacy practices and compliance posture against GDPR, CCPA, and other applicable regulations.',
    items: [
      { title: 'Data Inventory Update', duration: 10, description: 'Review any changes to the personal data inventory since the last review: new data categories collected, new processors added, or changes to data retention practices.' },
      { title: 'Privacy Incident Review', duration: 10, description: 'Review any privacy incidents or near-misses in the period: unauthorized access, accidental disclosure, or user rights requests that were not handled within required timelines.' },
      { title: 'Data Subject Rights Requests', duration: 10, description: 'Review the volume and handling of DSR requests (access, erasure, portability, rectification). Assess whether processes are functioning efficiently and within regulatory deadlines.' },
      { title: 'Third-Party Processor Review', duration: 15, description: 'Review the status of data processing agreements with key vendors. Identify any new processors not yet under DPA, or processors with upcoming contract renewals requiring privacy review.' },
      { title: 'Upcoming Regulatory Changes', duration: 10, description: 'Review any upcoming changes to privacy regulations or enforcement guidance that will require policy, process, or technical changes before they take effect.' },
      { title: 'Action Items', duration: 5, description: 'Assign specific compliance remediation tasks with owners and completion dates. Confirm any items requiring legal counsel review before action.' },
    ]
  },

  // ─── EDUCATION & NONPROFIT ─────────────────────────────────────────────────
  {
    name: 'Curriculum Design Workshop',
    description: 'Collaborative session for educators to design or redesign a course curriculum unit with clear learning objectives and assessment strategy.',
    items: [
      { title: 'Learning Objectives Setting', duration: 15, description: 'Using Bloom\'s Taxonomy, define the specific cognitive and behavioral outcomes students should achieve by the end of the unit. Use action verbs: analyze, evaluate, create, apply.' },
      { title: 'Prerequisite Knowledge Mapping', duration: 10, description: 'Map what prior knowledge students must have before engaging with this unit. Identify common misconceptions that need to be addressed proactively.' },
      { title: 'Instructional Sequence Design', duration: 20, description: 'Design the sequence of learning experiences: direct instruction, guided practice, collaborative activities, and independent application. Apply the gradual release model.' },
      { title: 'Assessment Design', duration: 15, description: 'Design formative assessments to check understanding throughout the unit and the summative assessment. Ensure assessments directly measure the stated learning objectives.' },
      { title: 'Differentiation Strategies', duration: 10, description: 'Discuss how the curriculum will be adapted for learners at different levels: scaffolds for struggling learners and extensions for advanced students.' },
      { title: 'Resource & Material Inventory', duration: 5, description: 'List all materials, texts, technology tools, and classroom resources needed to deliver the unit. Flag any procurement or preparation that needs to happen in advance.' },
    ]
  },
  {
    name: 'Board of Directors Meeting',
    description: 'Formal governance meeting of a nonprofit or corporate board to review organizational performance and make fiduciary decisions.',
    items: [
      { title: 'Call to Order & Quorum Confirmation', duration: 5, description: 'Board chair calls the meeting to order, confirms a quorum is present, and any conflicts of interest are disclosed for the record.' },
      { title: 'Approval of Prior Meeting Minutes', duration: 5, description: 'Board reviews and formally votes to approve the minutes from the previous board meeting. Any corrections are noted before approval.' },
      { title: 'Executive Director / CEO Report', duration: 20, description: 'ED or CEO presents on organizational performance: progress against strategic plan, major accomplishments, challenges, staffing updates, and key decisions requiring board awareness.' },
      { title: 'Financial Report & Budget Review', duration: 20, description: 'CFO or Treasurer presents financial statements: income statement, balance sheet, and cash flow. Review budget vs actual variances and year-end projections.' },
      { title: 'Committee Reports', duration: 15, description: 'Chairs of active committees (Audit, Governance, Programs, Fundraising) present brief updates on committee work and any recommendations requiring full board action.' },
      { title: 'New Business & Votes', duration: 15, description: 'Formal motions on items requiring board approval: major contracts, policy changes, executive compensation, new board member elections, or strategic plan amendments.' },
      { title: 'Executive Session', duration: 10, description: 'Board meets in closed session without staff present to discuss sensitive matters: executive performance, legal issues, or confidential strategic considerations.' },
    ]
  },

  // ─── HEALTHCARE & CLINICAL ─────────────────────────────────────────────────
  {
    name: 'Clinical Case Review',
    description: 'Multidisciplinary team meeting to review complex patient cases, align on care plans, and improve clinical outcomes.',
    items: [
      { title: 'Case Presentation', duration: 15, description: 'Presenting clinician summarizes the patient case: demographics, presenting complaint, medical history, diagnostic findings, and current treatment plan.' },
      { title: 'Diagnostic Discussion', duration: 15, description: 'Team reviews differential diagnosis, challenges the current diagnosis with available evidence, and discusses whether additional investigations are warranted.' },
      { title: 'Treatment Options Review', duration: 15, description: 'Evidence-based discussion of treatment options, including risks and benefits of each, patient preferences where known, and clinical guideline alignment.' },
      { title: 'Multidisciplinary Input', duration: 10, description: 'Nursing, pharmacy, social work, physical therapy, and other disciplines share perspective on the patient\'s functional status, social context, and care coordination needs.' },
      { title: 'Agreed Care Plan', duration: 10, description: 'Document the agreed care plan: diagnostic plan, therapeutic interventions, monitoring parameters, and escalation criteria.' },
      { title: 'Patient Communication Plan', duration: 5, description: 'Agree on how the care plan will be communicated to the patient and family, who will lead that conversation, and any consent processes required.' },
    ]
  },
  {
    name: 'Healthcare Quality Improvement (QI) Meeting',
    description: 'Recurring meeting to review quality metrics, analyze process problems, and drive improvement initiatives using structured QI methodology.',
    items: [
      { title: 'Quality Dashboard Review', duration: 10, description: 'Review key clinical quality indicators: readmission rates, infection rates, medication errors, patient satisfaction scores, and any Joint Commission or CMS metrics under watch.' },
      { title: 'Sentinel Event or Near-Miss Review', duration: 15, description: 'Present a recent sentinel event, adverse outcome, or near-miss using the RCA2 framework. Focus on system failures, not individual blame.' },
      { title: 'Active QI Project Updates', duration: 20, description: 'Each active QI project team presents PDSA cycle status: what was tested, what was measured, what was learned, and what the next cycle looks like.' },
      { title: 'New Problem Identification', duration: 10, description: 'Review incoming quality concerns from staff, patient complaints, or metric alerts. Decide which warrant a formal QI project vs a rapid process fix.' },
      { title: 'Action Items & Accountability', duration: 5, description: 'Confirm all action items have owners and completion dates. Review status of actions from the previous meeting.' },
    ]
  },

  // ─── MISC / PROFESSIONAL SERVICES ─────────────────────────────────────────
  {
    name: 'Client Status Meeting',
    description: 'Regular touchpoint with an external client to review project progress, surface concerns, and maintain strong relationship momentum.',
    items: [
      { title: 'Progress Since Last Meeting', duration: 10, description: 'Summarize work completed since the last client call: deliverables submitted, milestones hit, and decisions made. Use the client\'s language and success criteria, not internal jargon.' },
      { title: 'Current Work in Progress', duration: 10, description: 'Walk through what is actively being worked on, the current timeline, and any dependencies or decisions pending from the client side.' },
      { title: 'Issues & Risks', duration: 10, description: 'Proactively surface any emerging issues, timeline risks, or scope concerns. Clients appreciate early warning over surprises — frame honestly and bring a recommendation.' },
      { title: 'Client Feedback & Questions', duration: 10, description: 'Dedicated time for the client to raise concerns, provide feedback on work delivered, or ask questions. Listen fully before responding.' },
      { title: 'Upcoming Milestones & Client Actions', duration: 10, description: 'Preview what the client can expect before the next meeting. Clearly state any actions needed from the client: approvals, information, introductions, or decisions.' },
    ]
  },
  {
    name: 'Legal Matter Review',
    description: 'Internal review between legal and business stakeholders on the status of active legal matters, litigation, and contracts.',
    items: [
      { title: 'Active Litigation Update', duration: 15, description: 'Legal counsel updates on the status of active disputes or litigation: recent filings, discovery status, upcoming hearings, and settlement posture.' },
      { title: 'Contract Review Queue', duration: 15, description: 'Walk through contracts in the legal review queue. Identify any contracts approaching deadline or blocking business transactions that need to be prioritized.' },
      { title: 'Regulatory & Compliance Update', duration: 15, description: 'Counsel updates on regulatory developments relevant to the business: new rules, enforcement actions in the industry, or compliance deadline changes.' },
      { title: 'Legal Risk Register Review', duration: 10, description: 'Review the top legal risks facing the business and their current mitigation status. Discuss whether risk level has changed since the last review.' },
      { title: 'Upcoming Legal Needs', duration: 5, description: 'Business teams preview upcoming activities that will need legal support: fundraising, new market entry, product launches, or significant vendor negotiations.' },
    ]
  },
  {
    name: 'Real Estate / Facilities Planning',
    description: 'Strategic facilities planning session to align workspace needs with organizational growth, hybrid work policies, and cost targets.',
    items: [
      { title: 'Current Footprint Review', duration: 10, description: 'Review current office portfolio: locations, square footage, lease terms, headcount capacity vs current utilization, and monthly cost per seat.' },
      { title: 'Workforce Planning Inputs', duration: 10, description: 'Review current and projected headcount by location. Factor in remote/hybrid work ratios and the actual in-office attendance patterns observed in the past quarter.' },
      { title: 'Space Utilization Data', duration: 10, description: 'Present badge data, desk booking data, or sensor data showing actual space utilization by floor, day of week, and team. Identify underutilized vs overcrowded areas.' },
      { title: 'Upcoming Lease Events', duration: 10, description: 'Review leases expiring, options to exercise, and any break clauses in the next 24 months. Assess whether renewal, renegotiation, or exit is the right path for each.' },
      { title: 'Future State Options', duration: 15, description: 'Explore options for the future facilities strategy: consolidation, expansion, coworking supplements, workspace redesign, or geographic footprint changes aligned to talent strategy.' },
      { title: 'Decision & Next Steps', duration: 5, description: 'Confirm decisions made in this session and define the next steps for any real estate transactions or workplace redesign projects to begin.' },
    ]
  },
  {
    name: 'Investor Update Preparation',
    description: 'Internal prep session to align messaging, data accuracy, and narrative before a board or investor update.',
    items: [
      { title: 'Metrics Accuracy Review', duration: 15, description: 'Finance and data team confirm accuracy of all metrics planned for inclusion: MRR, ARR, churn, CAC, LTV, burn, runway, and cohort data. Flag any data quality concerns.' },
      { title: 'Narrative Arc Review', duration: 15, description: 'Walk through the story being told: are we leading with conviction, acknowledging challenges honestly, and framing the path forward credibly? Stress-test the narrative logic.' },
      { title: 'Hard Questions Preparation', duration: 15, description: 'Anticipate the toughest questions investors are likely to ask based on current performance. Draft and practice specific, honest answers to each.' },
      { title: 'Ask & Use of Proceeds', duration: 10, description: 'If a fundraise is being discussed, confirm the ask amount, use of proceeds breakdown, and the milestones the capital is expected to fund.' },
      { title: 'Deck & Materials Final Review', duration: 10, description: 'Review the final deck for design consistency, data accuracy, and narrative flow. Confirm appendix materials are ready for questions that may go deeper than the main deck.' },
      { title: 'Logistics & Roles', duration: 5, description: 'Confirm who will present each section, who will field specific topic areas in Q&A, and any logistics for virtual or in-person presentation format.' },
    ]
  },
  {
    name: 'Environmental, Social & Governance (ESG) Review',
    description: 'Quarterly review of ESG commitments, progress against sustainability targets, and reporting obligations.',
    items: [
      { title: 'Environmental Metrics Update', duration: 15, description: 'Review progress on environmental targets: carbon emissions (Scope 1, 2, 3), energy consumption, renewable energy percentage, water usage, and waste diversion rates.' },
      { title: 'Social Impact Review', duration: 15, description: 'Review social metrics: employee wellbeing scores, safety incident rates, community investment, supplier diversity, and any human rights risk assessments in the supply chain.' },
      { title: 'Governance Practices Update', duration: 10, description: 'Review governance KPIs: board diversity, ethics hotline volume and resolution rate, code of conduct training completion, and anti-corruption controls effectiveness.' },
      { title: 'Reporting & Disclosure Requirements', duration: 10, description: 'Review upcoming ESG reporting obligations: GRI, SASB, TCFD, SEC climate disclosure, or investor questionnaires. Assign ownership of each reporting requirement.' },
      { title: 'Materiality Assessment Update', duration: 10, description: 'Review whether the materiality assessment still reflects the most important ESG issues for the business and stakeholders, given any changes in the business or external environment.' },
      { title: 'Action Items & Targets Reset', duration: 10, description: 'Confirm owners for each in-progress ESG initiative, review whether targets need adjustment based on current performance trajectory, and define next reporting checkpoint.' },
    ]
  },
];
