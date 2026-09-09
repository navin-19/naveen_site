import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generateResume() {
  const pdfDoc = await PDFDocument.create();
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const helveticaOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const margin = 36;
  const contentWidth = pageWidth - margin * 2;

  const colorBlack = rgb(0.1, 0.1, 0.1);
  const colorDarkGray = rgb(0.25, 0.25, 0.25);
  const colorLightBlue = rgb(0.91, 0.95, 0.99);
  const colorBorderBlue = rgb(0.75, 0.85, 0.95);
  const colorLine = rgb(0.15, 0.25, 0.4);

  // ---------------- PAGE 1 ----------------
  const page1 = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - 38;

  // Header: Name
  const nameText = 'NAVEENKUMAR BOOMINATHAN';
  const nameWidth = helveticaBold.widthOfTextAtSize(nameText, 18);
  page1.drawText(nameText, {
    x: (pageWidth - nameWidth) / 2,
    y: y,
    size: 18,
    font: helveticaBold,
    color: colorBlack,
  });
  y -= 16;

  // Subtitle: QA Automation Engineer | SDET
  const subtitleText = 'QA Automation Engineer  |  SDET';
  const subtitleWidth = helveticaBold.widthOfTextAtSize(subtitleText, 11);
  page1.drawText(subtitleText, {
    x: (pageWidth - subtitleWidth) / 2,
    y: y,
    size: 11,
    font: helveticaBold,
    color: colorBlack,
  });
  y -= 14;

  // Contact Info Row
  const contactText = '+91-9344009866   |   naveen.boomi019@gmail.com   |   github.com/navin-19   |   Chennai, Tamil Nadu, India';
  const contactWidth = helvetica.widthOfTextAtSize(contactText, 8.5);
  page1.drawText(contactText, {
    x: (pageWidth - contactWidth) / 2,
    y: y,
    size: 8.5,
    font: helvetica,
    color: colorDarkGray,
  });
  y -= 18;

  // Helper: Section Title
  const drawSectionTitle = (page, title, curY) => {
    page.drawText(title, {
      x: margin,
      y: curY,
      size: 10.5,
      font: helveticaBold,
      color: colorBlack,
    });
    page.drawLine({
      start: { x: margin, y: curY - 3 },
      end: { x: pageWidth - margin, y: curY - 3 },
      thickness: 1.2,
      color: colorLine,
    });
    return curY - 14;
  };

  // Helper: Wrapped paragraph
  const drawWrappedText = (page, text, curY, fontSize = 8.5, lineHeight = 11.5, customWidth = contentWidth, customX = margin) => {
    const words = text.split(' ');
    let currentLine = '';
    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine ? `${currentLine} ${words[i]}` : words[i];
      const testWidth = helvetica.widthOfTextAtSize(testLine, fontSize);
      if (testWidth > customWidth && currentLine) {
        page.drawText(currentLine, {
          x: customX,
          y: curY,
          size: fontSize,
          font: helvetica,
          color: colorDarkGray,
        });
        curY -= lineHeight;
        currentLine = words[i];
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      page.drawText(currentLine, {
        x: customX,
        y: curY,
        size: fontSize,
        font: helvetica,
        color: colorDarkGray,
      });
      curY -= lineHeight;
    }
    return curY;
  };

  // Helper: Bullet point
  const drawBullet = (page, text, curY, fontSize = 8.5, lineHeight = 11.5, customWidth = contentWidth - 12, customX = margin + 10) => {
    page.drawText('•', {
      x: margin,
      y: curY,
      size: fontSize + 1,
      font: helveticaBold,
      color: colorBlack,
    });
    return drawWrappedText(page, text, curY, fontSize, lineHeight, customWidth, customX);
  };

  // 1. PROFESSIONAL SUMMARY
  y = drawSectionTitle(page1, 'PROFESSIONAL SUMMARY', y);
  const summaryText =
    'Results-oriented QA Automation Engineer with 1+ year of hands-on experience designing, developing, and executing automated test scripts for web applications and REST APIs using Selenium WebDriver, Pytest, and Postman. Proficient in Page Object Model (POM), Data-Driven Testing (DDT), and Hybrid Framework design. Experienced integrating test suites into CI/CD pipelines using Jenkins and GitHub Actions. Skilled in functional, regression, smoke, end-to-end (E2E), and API testing within Agile/Scrum environments. Strong knowledge of SDLC, STLC, and defect lifecycle management using JIRA.';
  y = drawWrappedText(page1, summaryText, y, 8.5, 11.5);
  y -= 8;

  // 2. CORE COMPETENCIES
  y = drawSectionTitle(page1, 'CORE COMPETENCIES', y);
  const competencies = [
    ['Selenium WebDriver Automation', 'REST API Testing (Postman)', 'CI/CD Pipeline Integration'],
    ['Page Object Model (POM)', 'Functional & Regression Testing', 'Agile / Scrum Methodology'],
    ['Data-Driven Testing (DDT)', 'End-to-End (E2E) Testing', 'Defect Life Cycle (JIRA)'],
    ['BDD / Cucumber (Gherkin)', 'Performance Testing (JMeter)', 'SDLC / STLC / Test Planning'],
  ];

  const colWidth = contentWidth / 3;
  const rowHeight = 16;
  const tableY = y;

  competencies.forEach((row, rowIndex) => {
    const rowY = tableY - rowIndex * rowHeight;
    // Background highlight alternating
    page1.drawRectangle({
      x: margin,
      y: rowY - rowHeight + 4,
      width: contentWidth,
      height: rowHeight,
      color: rowIndex % 2 === 0 ? colorLightBlue : rgb(0.96, 0.98, 1),
      borderColor: colorBorderBlue,
      borderWidth: 0.5,
    });

    row.forEach((item, colIndex) => {
      const itemWidth = helvetica.widthOfTextAtSize(item, 8);
      const itemX = margin + colIndex * colWidth + (colWidth - itemWidth) / 2;
      page1.drawText(item, {
        x: itemX,
        y: rowY - 8,
        size: 8,
        font: helveticaBold,
        color: colorBlack,
      });
    });
  });

  y = tableY - competencies.length * rowHeight - 12;

  // 3. TECHNICAL SKILLS
  y = drawSectionTitle(page1, 'TECHNICAL SKILLS', y);
  const technicalSkills = [
    { label: 'Automation Tools', value: 'Selenium WebDriver, Playwright (Basic)' },
    { label: 'Test Frameworks', value: 'Pytest, TestNG (Basic), Page Object Model (POM), Data-Driven Framework, Hybrid Framework' },
    { label: 'BDD Framework', value: 'Cucumber (Gherkin), BDD Methodology' },
    { label: 'API Testing', value: 'Postman, REST API Testing, Request/Response Validation, Schema Validation, Newman' },
    { label: 'Performance Testing', value: 'Apache JMeter — Load Testing, Stress Testing, Performance Bench marking' },
    { label: 'Programming Languages', value: 'Python, TypeScript, JavaScript (Basic)' },
    { label: 'CI/CD & DevOps', value: 'Jenkins, GitHub Actions, Continuous Integration, Continuous Testing' },
    { label: 'Version Control', value: 'Git, GitHub — branching, pull requests, code reviews' },
    { label: 'Defect & Test Mgmt', value: 'JIRA, Zephyr (Basic), Test Case Design, Bug Reporting, Test Execution' },
    { label: 'Testing Types', value: 'Functional, Regression, Smoke, Sanity, UI, API, E2E, UAT, Integration Testing' },
    { label: 'Core Concepts', value: 'SDLC, STLC, Defect Lifecycle, Client-Server Architecture, Shift-Left Testing' },
    { label: 'Methodologies', value: 'Agile, Scrum, Sprint Planning, Daily Standups, Retrospectives' },
  ];

  technicalSkills.forEach((skill) => {
    page1.drawText(skill.label, {
      x: margin,
      y: y,
      size: 8.5,
      font: helveticaBold,
      color: colorBlack,
    });
    page1.drawText(skill.value, {
      x: margin + 130,
      y: y,
      size: 8.5,
      font: helvetica,
      color: colorDarkGray,
    });
    y -= 13;
  });

  y -= 4;

  // 4. PROFESSIONAL EXPERIENCE
  y = drawSectionTitle(page1, 'PROFESSIONAL EXPERIENCE', y);

  // Role Header
  page1.drawText('QA Automation Engineer', {
    x: margin,
    y: y,
    size: 9.5,
    font: helveticaBold,
    color: colorBlack,
  });
  const dateText = '2025 – Present';
  const dateWidth = helveticaBold.widthOfTextAtSize(dateText, 9);
  page1.drawText(dateText, {
    x: pageWidth - margin - dateWidth,
    y: y,
    size: 9,
    font: helveticaBold,
    color: colorBlack,
  });
  y -= 11;

  page1.drawText('TROUDZ AI LABS  |  Bangalore, India', {
    x: margin,
    y: y,
    size: 8.5,
    font: helveticaBold,
    color: rgb(0.2, 0.3, 0.45),
  });
  y -= 13;

  y = drawBullet(
    page1,
    'Designed and developed automated UI test scripts using Selenium WebDriver with Python and Pytest framework, implementing Page Object Model (POM) for scalable and maintainable test architecture.',
    y
  );

  // ---------------- PAGE 2 ----------------
  const page2 = pdfDoc.addPage([pageWidth, pageHeight]);
  y = pageHeight - 38;

  const expBullets = [
    'Built and executed end-to-end (E2E) test automation suites covering critical user workflows, achieving significant reduction in manual testing effort across multiple sprint cycles.',
    'Performed comprehensive REST API testing using Postman — validating request payloads, authentication tokens, response schemas, status codes, and error handling scenarios.',
    'Integrated automated test suites into CI/CD pipelines using GitHub Actions, enabling continuous testing on every code commit and pull request for faster, reliable releases.',
    'Executed functional testing, regression testing, smoke testing, and sanity testing for new feature releases and hotfix deployments across Agile sprint cycles.',
    'Identified, documented, and tracked defects in JIRA with detailed reproduction steps, severity classification, screenshots, and expected vs. actual results.',
    'Conducted load and performance testing using Apache JMeter to evaluate system scalability and response times under simulated user loads.',
    'Actively participated in Agile/Scrum ceremonies — sprint planning, daily stand ups, sprint reviews, and retrospectives — collaborating with developers and product owners.',
    'Validated end-to-end data flow between frontend UI and backend APIs, ensuring data integrity, accurate business logic, and consistent application behavior.',
  ];

  expBullets.forEach((bullet) => {
    y = drawBullet(page2, bullet, y);
    y -= 2;
  });

  y -= 6;

  // 5. PROJECT EXPERIENCE (2 Column Cards)
  y = drawSectionTitle(page2, 'PROJECT EXPERIENCE', y);

  const projColWidth = (contentWidth - 14) / 2;
  const startProjY = y;

  // Project 1: Sunbond
  let p1Y = startProjY;
  page2.drawText('Sunbond QA Automation Engineer', {
    x: margin,
    y: p1Y,
    size: 9,
    font: helveticaBold,
    color: colorBlack,
  });
  p1Y -= 11;
  page2.drawText('WhatsApp Automation & Customer Engagement Platform', {
    x: margin,
    y: p1Y,
    size: 8,
    font: helveticaOblique,
    color: colorDarkGray,
  });
  p1Y -= 12;

  const p1Bullets = [
    'Web-based SaaS platform enabling businesses to automate WhatsApp communications, bulk messaging campaigns, and delivery tracking via integrated APIs.',
    'Designed UI automation scripts using Selenium WebDriver (Python + Pytest) for campaign workflows with POM design pattern.',
    'Performed API testing using Postman — validating WhatsApp APIs, auth headers, payloads, webhook responses, and error handling.',
    'Verified end-to-end message delivery workflows, bulk send scenarios, status tracking, and failure/retry handling.',
    'Integrated test suites into CI/CD pipeline using GitHub Actions for continuous testing on every feature merge.',
    'Conducted regression, smoke, and exploratory testing; reported defects in JIRA with detailed reproduction steps.',
    'Validated complete E2E workflows from UI input through API execution to database update for data consistency.',
  ];

  p1Bullets.forEach((b) => {
    page2.drawText('•', { x: margin, y: p1Y, size: 8, font: helveticaBold, color: colorBlack });
    p1Y = drawWrappedText(page2, b, p1Y, 7.8, 9.8, projColWidth - 8, margin + 7);
    p1Y -= 1.5;
  });

  // Project 2: Troudz
  let p2Y = startProjY;
  const p2X = margin + projColWidth + 14;

  page2.drawText('Troudz QA Automation Engineer', {
    x: p2X,
    y: p2Y,
    size: 9,
    font: helveticaBold,
    color: colorBlack,
  });
  p2Y -= 11;
  page2.drawText('ROI Calculator & Business Analytics Platform', {
    x: p2X,
    y: p2Y,
    size: 8,
    font: helveticaOblique,
    color: colorDarkGray,
  });
  p2Y -= 12;

  const p2Bullets = [
    'Web-based analytics app computing ROI and key business metrics from user inputs, enabling data-driven financial decisions with accurate calculations.',
    'Performed functional testing of ROI calculation modules — validating business logic, boundary conditions, and formula correctness.',
    'Validated UI input fields, data entry controls, output results, and error messages across positive, negative, and boundary test cases.',
    'Conducted API testing using Postman to verify backend data processing — request/response payloads and data transformation accuracy.',
    'Executed end-to-end data flow testing between frontend and backend, verifying data integrity and correct business metric storage.',
    'Reported calculation discrepancies and UI defects in JIRA with steps to reproduce, actual vs. expected results, and severity ratings.',
    'Performed RCA with developers and verification testing post bug fix; participated in Agile sprint cycles for on-time delivery.',
  ];

  p2Bullets.forEach((b) => {
    page2.drawText('•', { x: p2X, y: p2Y, size: 8, font: helveticaBold, color: colorBlack });
    p2Y = drawWrappedText(page2, b, p2Y, 7.8, 9.8, projColWidth - 8, p2X + 7);
    p2Y -= 1.5;
  });

  y = Math.min(p1Y, p2Y) - 8;

  // 6. EDUCATION
  y = drawSectionTitle(page2, 'EDUCATION', y);
  page2.drawText('BCA (Bachelor of Computer Application)', {
    x: margin,
    y: y,
    size: 9,
    font: helveticaBold,
    color: colorBlack,
  });
  const eduDate = '2018 Aug – 2021 Mar';
  const eduDateWidth = helveticaBold.widthOfTextAtSize(eduDate, 8.5);
  page2.drawText(eduDate, {
    x: pageWidth - margin - eduDateWidth,
    y: y,
    size: 8.5,
    font: helveticaBold,
    color: colorBlack,
  });
  y -= 11;
  page2.drawText('Annai College of Arts & Science  |  Bharathidasan University, Tamil Nadu', {
    x: margin,
    y: y,
    size: 8.5,
    font: helvetica,
    color: colorDarkGray,
  });
  y -= 15;

  // 7. CERTIFICATIONS
  y = drawSectionTitle(page2, 'CERTIFICATIONS', y);
  const certs = [
    'Python Fundamentals — Besent technologies, Chennai (2022)',
    'Python Full Stack Development — Qtree Technologies, Chennai (2023)',
  ];
  certs.forEach((c) => {
    page2.drawText('•', { x: margin + 5, y: y, size: 8.5, font: helveticaBold, color: colorBlack });
    page2.drawText(c, { x: margin + 14, y: y, size: 8.5, font: helvetica, color: colorDarkGray });
    y -= 11.5;
  });
  y -= 4;

  // 8. KEY ACHIEVEMENTS
  y = drawSectionTitle(page2, 'KEY ACHIEVEMENTS', y);
  const achievements = [
    'Automated critical end-to-end workflows for Sunbond WhatsApp platform, reducing manual regression effort and enabling continuous testing via GitHub Actions CI/CD integration.',
    'Identified and resolved high-severity calculation defects in Troudz ROI platform, improving business logic accuracy and preventing incorrect financial outputs in production.',
    'Proactively learned and applied Playwright (TypeScript) for modern web automation, expanding capability beyond Selenium WebDriver.',
    'Consistently delivered thorough defect reports in JIRA with clear reproduction steps, contributing to faster developer turnaround and reduced defect escape rates.',
  ];
  achievements.forEach((a) => {
    y = drawBullet(page2, a, y, 8, 10.5);
    y -= 1.5;
  });

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.resolve('public/resume.pdf');
  const backupPath = path.resolve('public/Naveenkumar_Boominathan_Resume.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  fs.writeFileSync(backupPath, pdfBytes);
  console.log(`Successfully created resume PDF at ${outputPath} and ${backupPath}`);
}

generateResume().catch(console.error);
