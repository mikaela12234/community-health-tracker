const form = document.getElementById('health-form');
const reportList = document.getElementById('report-list');

// Load saved reports from localStorage on page load
window.onload = () => {
  const savedReports = JSON.parse(localStorage.getItem('reports')) || [];
  savedReports.forEach(report => {
    displayReport(report);
  });
};

// Handle form submission
form.addEventListener('submit', function(event) {
  event.preventDefault();

  // Get form input values
  const name = document.getElementById('name').value;
  const purok = document.getElementById('purok').value;
  const age = document.getElementById('age').value;
  const illness = document.getElementById('illness').value;
  const contact = document.getElementById('contact').value;
  const symptoms = document.getElementById('symptoms').value;
  const contactMethod = document.getElementById('contactMethod').value;
  const currentDate = new Date().toLocaleDateString();

  const report = {
    name,
    purok,
    age,
    illness,
    contact,
    symptoms,
    contactMethod,
    date: currentDate,
    delivered: false
  };

  // Save to localStorage
  const savedReports = JSON.parse(localStorage.getItem('reports')) || [];
  savedReports.push(report);
  localStorage.setItem('reports', JSON.stringify(savedReports));

  // Display the new report
  displayReport(report);

  // Clear the form for the next input
  form.reset();
});

// Function to display the report on the page
function displayReport(report) {
  const reportItem = document.createElement('li');
  reportItem.innerHTML = `
    <strong>Name:</strong> ${report.name} <br>
    <strong>Purok:</strong> ${report.purok} <br>
    <strong>Age:</strong> ${report.age} <br>
    <strong>Illness:</strong> ${report.illness} <br>
    <strong>Emergency Contact:</strong> ${report.contact} <br>
    <strong>Symptoms:</strong> ${report.symptoms} <br>
    <strong>Preferred Contact:</strong> ${report.contactMethod} <br>
    <strong>Date:</strong> ${report.date}
  `;
  
  // Add a button to mark the report as delivered
  const markDeliveredButton = document.createElement('button');
  markDeliveredButton.innerText = 'Mark as Delivered';
  markDeliveredButton.classList.add('delivered');
  markDeliveredButton.onclick = function() {
    reportItem.style.backgroundColor = '#d4edda'; // Change color to indicate it's delivered
    report.delivered = true;

    // Update localStorage to reflect the delivered status
    const savedReports = JSON.parse(localStorage.getItem('reports')) || [];
    const index = savedReports.findIndex(r => r.name === report.name && r.date === report.date);
    savedReports[index].delivered = true;
    localStorage.setItem('reports', JSON.stringify(savedReports));
  };

  reportItem.appendChild(markDeliveredButton);
  reportList.appendChild(reportItem);
}
