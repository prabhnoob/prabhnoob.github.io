"""Generate a public resume from the supplied Autodesk, Talos and Aryze resumes."""
from pathlib import Path
import argparse
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, KeepTogether


def build_resume(output: Path):
    output.parent.mkdir(parents=True, exist_ok=True)
    ink = colors.HexColor('#19232D')
    styles = {
        'name': ParagraphStyle('name', fontName='Helvetica-Bold', fontSize=23, leading=27, textColor=ink, spaceAfter=3),
        'contact': ParagraphStyle('contact', fontName='Helvetica', fontSize=9.5, leading=13, textColor=ink),
        'section': ParagraphStyle('section', fontName='Helvetica-Bold', fontSize=10.5, leading=14, textColor=ink, spaceBefore=11, spaceAfter=3),
        'heading': ParagraphStyle('heading', fontName='Helvetica-Bold', fontSize=10.5, leading=14, textColor=ink, spaceAfter=2),
        'body': ParagraphStyle('body', fontName='Helvetica', fontSize=10, leading=13.5, textColor=ink, spaceAfter=3),
        'tech': ParagraphStyle('tech', fontName='Helvetica', fontSize=9.3, leading=12, textColor=colors.HexColor('#46525C'), spaceAfter=3),
        'bullet': ParagraphStyle('bullet', fontName='Helvetica', fontSize=10, leading=13.5, textColor=ink, leftIndent=10, firstLineIndent=-8, spaceAfter=3),
    }
    story = []
    def p(text, style='body'):
        return Paragraph(text, styles[style])
    def section(title):
        story.extend([p(title, 'section'), HRFlowable(width='100%', thickness=.6, color=colors.HexColor('#9AA3AA')), Spacer(1, 5)])
    def project(title, tech, bullets):
        story.append(KeepTogether([p(title, 'heading'), p(tech, 'tech')] + [p('- '+b, 'bullet') for b in bullets] + [Spacer(1, 5)]))
    story += [p('PRABHNOOR SINGH', 'name'),
        p('Computer Science Co-op Student | Software Development', 'body'),
        p('Victoria, BC | <link href="mailto:prabhnoorsingh@uvic.ca">prabhnoorsingh@uvic.ca</link>', 'contact'),
        p('<link href="https://prabhnoob.github.io/">prabhnoob.github.io</link> | <link href="https://github.com/prabhnoob">github.com/prabhnoob</link>', 'contact')]
    section('EDUCATION')
    story += [p('University of Victoria | B.Sc. Computer Science, Co-op', 'heading'),
        p('Expected graduation: 2028', 'body'),
        p('Relevant coursework: Data Structures and Algorithms, Software Testing, Operating Systems, Database Systems, Requirements Engineering, Human-Computer Interaction', 'body')]
    section('TECHNICAL SKILLS')
    story += [p('<b>Languages:</b> Python, C/C++, Java, TypeScript, JavaScript, SQL'),
        p('<b>Web and data:</b> React, HTML/CSS, Three.js, WebGL, pandas, REST APIs'),
        p('<b>Tools and testing:</b> Git, GitHub, Linux, JUnit 5, Mockito, boundary and mutation testing')]
    section('SELECTED PROJECTS')
    project('UVcraft | Interactive 3D Campus Experience', 'React, TypeScript, Three.js | <link href="https://prabhnoob.github.io/UVcraft/">Live demo</link> | <link href="https://github.com/prabhnoob/UVcraft">GitHub</link>', [
        'Built a browser-based 3D UVic campus with reusable scene components and navigation for desktop and mobile.',
        'Tuned real-time rendering and controls to keep the campus responsive across devices.'
    ])
    project('JPacman Gameplay Validation | SENG 275', 'Java, JUnit 5, Mockito, mutation testing', [
        'Created 37 automated tests covering gameplay state, game rules, collisions, and edge cases.',
        'Used boundary, coverage, and mutation testing to isolate defects and document reproducible failures.'
    ])
    project('Patient Data Management | SENG 265', 'Python, C, pandas', [
        'Built searchable patient records and clinical notes, including workflows for selecting and updating active records.',
        'Validated state changes through 23 end-to-end workflow scenarios covering authentication, records, and notes.'
    ])
    section('WORK EXPERIENCE')
    story += [p("Mark's | Sales Associate", 'heading'), p('Oct 2025 - Present', 'tech'),
        p('- Help customers compare products and choose options that meet their needs.', 'bullet'),
        p('- Process point-of-sale transactions, maintain inventory and merchandising standards, and coordinate store tasks with teammates.', 'bullet'), Spacer(1, 5),
        p("Felicita's University Pub (UVSS) | Cook / Customer Service", 'heading'), p('Victoria, BC | Apr 2025 - Present', 'tech'),
        p('- Coordinate with the service team during high-volume shifts while balancing food quality, safety, timing, and customer needs.', 'bullet')]
    SimpleDocTemplate(str(output), pagesize=letter, leftMargin=43, rightMargin=43,
        topMargin=34, bottomMargin=34, title='Prabhnoor Singh - Software Development Resume',
        author='Prabhnoor Singh', subject='Computer Science co-op resume').build(story)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--output', type=Path, default=Path('output/pdf/prabhnoor-singh-resume.pdf'))
    args = parser.parse_args()
    build_resume(args.output.resolve())
    print(args.output.resolve())
