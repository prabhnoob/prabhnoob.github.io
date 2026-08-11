"""Generate the public portfolio resume from verified/local source material."""

from __future__ import annotations

import argparse
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    HRFlowable,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


INK = colors.HexColor("#071316")
MUTED = colors.HexColor("#526568")
ACCENT = colors.HexColor("#087F69")
LINE = colors.HexColor("#C8D7D4")
PALE = colors.HexColor("#EAF7F3")


def paragraph(text: str, style: ParagraphStyle) -> Paragraph:
    return Paragraph(text, style)


def section_title(text: str, style: ParagraphStyle) -> list:
    return [paragraph(text.upper(), style), Spacer(1, 0.07 * inch)]


def project_block(title: str, tech: str, description: str, styles: dict[str, ParagraphStyle]) -> list:
    return [
        paragraph(title, styles["project_title"]),
        paragraph(tech, styles["tech"]),
        Spacer(1, 0.035 * inch),
        paragraph(description, styles["small"]),
        Spacer(1, 0.11 * inch),
    ]


def experience_block(
    role: str,
    organization: str,
    dates: str,
    description: str,
    styles: dict[str, ParagraphStyle],
) -> list:
    return [
        paragraph(role, styles["sidebar_heading"]),
        paragraph(f"{organization} | {dates}", styles["tech"]),
        Spacer(1, 0.035 * inch),
        paragraph(description, styles["sidebar_body"]),
        Spacer(1, 0.11 * inch),
    ]


def build_resume(output_path: Path) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)

    base = getSampleStyleSheet()
    styles: dict[str, ParagraphStyle] = {
        "name": ParagraphStyle(
            "Name",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=25,
            leading=27,
            textColor=INK,
            spaceAfter=2,
        ),
        "role": ParagraphStyle(
            "Role",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=8.4,
            leading=10,
            textColor=ACCENT,
            tracking=1.25,
            spaceAfter=6,
        ),
        "contact": ParagraphStyle(
            "Contact",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=7.8,
            leading=10,
            textColor=MUTED,
        ),
        "profile": ParagraphStyle(
            "Profile",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.8,
            leading=12.2,
            textColor=INK,
            spaceAfter=0,
        ),
        "section": ParagraphStyle(
            "Section",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=7.4,
            leading=9,
            textColor=ACCENT,
            tracking=1.35,
        ),
        "project_title": ParagraphStyle(
            "ProjectTitle",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=9.2,
            leading=11,
            textColor=INK,
        ),
        "tech": ParagraphStyle(
            "Tech",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=6.8,
            leading=8.5,
            textColor=ACCENT,
        ),
        "small": ParagraphStyle(
            "Small",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=7.6,
            leading=10.1,
            textColor=MUTED,
        ),
        "sidebar_heading": ParagraphStyle(
            "SidebarHeading",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=8.3,
            leading=10,
            textColor=INK,
        ),
        "sidebar_body": ParagraphStyle(
            "SidebarBody",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=7.3,
            leading=9.6,
            textColor=MUTED,
        ),
        "skill_label": ParagraphStyle(
            "SkillLabel",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=7.4,
            leading=9.4,
            textColor=INK,
            spaceAfter=1,
        ),
    }

    document = SimpleDocTemplate(
        str(output_path),
        pagesize=letter,
        rightMargin=0.52 * inch,
        leftMargin=0.52 * inch,
        topMargin=0.43 * inch,
        bottomMargin=0.43 * inch,
        title="Prabhnoor Singh - Software Developer Resume",
        author="Prabhnoor Singh",
        subject="Software development portfolio resume",
    )

    story = [
        HRFlowable(width="100%", thickness=5, color=ACCENT, spaceAfter=0.15 * inch),
        paragraph("Prabhnoor Singh", styles["name"]),
        paragraph("COMPUTER SCIENCE STUDENT  |  SOFTWARE DEVELOPER", styles["role"]),
        paragraph(
            'Victoria, BC  |  <link href="mailto:prabhnoorarcher@gmail.com" color="#526568">prabhnoorarcher@gmail.com</link>  |  '
            '<link href="https://github.com/prabhnoob" color="#526568">github.com/prabhnoob</link>',
            styles["contact"],
        ),
        Spacer(1, 0.13 * inch),
        paragraph(
            "Computer Science student and software developer building responsive web products, mobile workflows, systems projects, and interactive 3D experiences. Focused on clear component architecture, accessible interaction, maintainable code, and turning technical complexity into useful product experiences.",
            styles["profile"],
        ),
        Spacer(1, 0.14 * inch),
        HRFlowable(width="100%", thickness=0.7, color=LINE, spaceAfter=0.15 * inch),
    ]

    projects_column = []
    projects_column += section_title("Selected projects", styles["section"])
    projects_column.extend(
        project_block(
            "UVcraft",
            "React | TypeScript | Three.js | React Three Fiber | Vite",
            "Built a browser-based 3D University of Victoria campus walk with desktop and mobile controls, modular scene systems, GIS-derived campus geometry, and optional LAN co-op. "
            '<link href="https://prabhnoob.github.io/UVcraft/" color="#087F69">Live demo</link>  |  '
            '<link href="https://github.com/prabhnoob/UVcraft" color="#087F69">GitHub</link>',
            styles,
        )
    )
    projects_column.extend(
        project_block(
            "Stock Evolver",
            "React | TypeScript | Data visualisation",
            "Designed an interactive investment-analysis dashboard with reusable components and focused views that make dense market information easier to scan and compare.",
            styles,
        )
    )
    projects_column.extend(
        project_block(
            "SmartLift",
            "Expo | React Native | Firebase",
            "Shaped a mobile workout experience that connects authenticated user flows with persistent routine and workout tracking across sessions.",
            styles,
        )
    )
    projects_column.extend(
        project_block(
            "Wildfire Tracker",
            "React | NASA EONET | Mapping APIs",
            "Transformed NASA EONET wildfire data into an interactive geographic overview with incident markers and focused event details.",
            styles,
        )
    )
    projects_column.extend(
        project_block(
            "CSC 360 Simple Shell",
            "C | Linux | Systems programming",
            "Implemented a command shell exploring process execution, background jobs, signal handling, and process lifecycle management.",
            styles,
        )
    )

    sidebar = []
    sidebar += section_title("Education", styles["section"])
    sidebar += [
        paragraph("Bachelor of Computer Science", styles["sidebar_heading"]),
        paragraph("University of Victoria", styles["tech"]),
        paragraph("In progress | Expected 2027", styles["sidebar_body"]),
        Spacer(1, 0.15 * inch),
    ]

    sidebar += section_title("Experience", styles["section"])
    sidebar.extend(
        experience_block(
            "Cook / Customer Service",
            "Felicita's University Pub",
            "Apr 2025 - Present",
            "Coordinate with a service team during high-volume shifts while balancing quality, safety, timing, and customer needs.",
            styles,
        )
    )
    sidebar.extend(
        experience_block(
            "Sales Associate",
            "Walmart - Hillside Victoria",
            "2023 - 2025",
            "Supported customers, inventory, presentation, and point-of-sale operations with accuracy and dependable teamwork.",
            styles,
        )
    )

    sidebar += section_title("Technical toolkit", styles["section"])
    skills = [
        ("Languages", "TypeScript, JavaScript, C, Python, SQL"),
        ("Web and mobile", "React, Vite, Expo, HTML, modern CSS"),
        ("Data and platforms", "Firebase, REST APIs, mapping, data visualisation"),
        ("Systems and graphics", "Linux, Git, GitHub, Three.js, React Three Fiber"),
    ]
    for label, values in skills:
        sidebar.append(paragraph(label, styles["skill_label"]))
        sidebar.append(paragraph(values, styles["sidebar_body"]))
        sidebar.append(Spacer(1, 0.07 * inch))

    sidebar += [
        Spacer(1, 0.06 * inch),
        Table(
            [[paragraph("OPEN TO SOFTWARE CO-OP, INTERNSHIP, AND COLLABORATION OPPORTUNITIES", styles["tech"])]],
            colWidths=[2.2 * inch],
            style=TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, -1), PALE),
                    ("BOX", (0, 0), (-1, -1), 0.5, colors.HexColor("#A7D8CB")),
                    ("LEFTPADDING", (0, 0), (-1, -1), 8),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                    ("TOPPADDING", (0, 0), (-1, -1), 7),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
                    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ]
            ),
        ),
    ]

    columns = Table(
        [[projects_column, sidebar]],
        colWidths=[4.37 * inch, 2.36 * inch],
        hAlign=TA_LEFT,
        style=TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (0, 0), 0),
                ("RIGHTPADDING", (0, 0), (0, 0), 16),
                ("LEFTPADDING", (1, 0), (1, 0), 15),
                ("RIGHTPADDING", (1, 0), (1, 0), 0),
                ("LINEBEFORE", (1, 0), (1, 0), 0.6, LINE),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        ),
    )
    story.append(columns)

    document.build(story)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("output/pdf/prabhnoor-singh-resume.pdf"),
    )
    args = parser.parse_args()
    build_resume(args.output.resolve())
    print(args.output.resolve())


if __name__ == "__main__":
    main()
