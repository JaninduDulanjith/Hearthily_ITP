



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import jspdf from 'jspdf';
import 'jspdf-autotable';
import companyLogo from '../../icons/logo.png'
import "C:/Users/janin/Desktop/DuviniITP/hearthily/frontend/src/css/Employee CSS/Report.css"

const Userlist = () => {
  const location = useLocation();
  const path = location.pathname.split('/')[1];
  const [dataList, setDataList] = useState([]);

  const headers = [
    'Name',
    'Email',
    'Age',
    'EmpID',
    'StartDate',
    'jobRole',
    'Address',
    'PhoneNumber',
  ];

  useEffect(() => {
    axios
      .get('http://localhost:3500/EmpReg')
      .then((result) => setDataList(result.data))
      .catch((err) => console.log(err));
  }, []);

  function generatePDF(tickets) {
    const doc = new jspdf();
    const tableRows = [];

    tickets.forEach((ticket, index) => {
      const ticketData = [
        ticket.name,
        ticket.email,
        ticket.age,
        ticket.empNumber,
        ticket.startDate,
        ticket.jobRole,
        ticket.address,
        ticket.phoneNumber,
      ];
      tableRows.push(ticketData);
    });

    const date = new Date().toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    const margin = 14;
    const logoWidth = 30;
    const logoHeight = 20;
    const maxWidth = 290;
    const textLines = doc.splitTextToSize(
      `The employee details table includes fields for name, email, age, EmpID, start date, job role, address, and phone number. It serves as a centralized repository for HR, facilitating tasks like payroll, performance evaluation, and record-keeping.`,
      maxWidth
    );
    const textParagraph = textLines.join('\n');

    doc.addImage(
      companyLogo,
      'PNG',
      doc.internal.pageSize.width - margin - logoWidth,
      margin,
      logoWidth,
      logoHeight
    );

 
    doc.setFontSize(10).setFont('helvetica').text('Nevil Nutri Feeds Pvt.Ltd', margin, margin + 10);
    doc.text('No:241, Radawana', margin, margin + 15);
    doc.text('Henagama Rd', margin, margin + 20);
    doc.text('Gampaha', margin, margin + 25);
    doc.text('Sri Lanka', margin, margin + 30);

    doc.setFontSize(10).text(`Date: ${date}`, margin, margin + 35);

    doc.setFontSize(20).setTextColor(56, 119, 91).setFont('helvetica', 'bold').text('Employee Registry Report', margin, 70);

    doc.setFontSize(10).setFont('helvetica', 'normal').setTextColor(0, 0, 0).text(
      textParagraph,
      margin,
      80,
      { maxWidth: maxWidth }
    );

    doc.autoTable(headers, tableRows, {
      styles: { fontSize: 10 },
      startY: 100,
      headerStyles: { fillColor: [31, 41, 55] },
    });

    doc.setFontSize(10).setTextColor(200, 200, 200).text(`Report generated by Employee Management System`, margin, doc.internal.pageSize.height - 10);

    doc.save('Employee-Registry-Report.pdf');
  }

  return (
    <div>
      <button
        onClick={() => {
          generatePDF(dataList);
        }}
        className="download-button"
      >
        Download
      </button>
    </div>
  );
};

export default Userlist;

