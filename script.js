const sectors = [
  { rows: 4, seatsPerRow: 4 },
  { rows: 4, seatsPerRow: 10 },
  { rows: 4, seatsPerRow: 4 },
  { rows: 4, seatsPerRow: 4 },
  { rows: 4, seatsPerRow: 10 },
  { rows: 4, seatsPerRow: 4 },
  { rows: 7, seatsPerRow: 4 },
  { rows: 7, seatsPerRow: 10 },
  { rows: 7, seatsPerRow: 4 }
];

const seatingContainer = document.getElementById('seating-container');
const selectedSeatsDisplay = document.getElementById('selected-seats');
const backButton = document.getElementById('back-button');
let selectedSeats = [];

function renderSectors() {
  seatingContainer.innerHTML = '';
  sectors.forEach((sector, index) => {
    // Create a sector block for small screens
    const sectorDiv = document.createElement('div');
    sectorDiv.classList.add('sector');
    sectorDiv.id = `sector-${index + 1}`;
    sectorDiv.textContent = `Sector ${index + 1}`;
    sectorDiv.onclick = () => viewSector(index);

    // Create a grid of seats for each sector
    const seatGrid = document.createElement('div');
    seatGrid.classList.add('seat-grid');
    seatGrid.style.gridTemplateColumns = `repeat(${sector.seatsPerRow}, 1fr)`;
    for (let row = 1; row <= sector.rows; row++) {
      for (let seat = 1; seat <= sector.seatsPerRow; seat++) {
        const seatDiv = document.createElement('div');
        seatDiv.classList.add('seat');
        seatDiv.textContent = `${String.fromCharCode(65 + index)}${row}${seat}`;
        seatDiv.onclick = (e) => toggleSeatSelection(e, `${String.fromCharCode(65 + index)}${row}${seat}`);
        seatGrid.appendChild(seatDiv);
      }
    }

    // Append the seat grid and sector to the seating container
    seatingContainer.appendChild(sectorDiv);
    seatingContainer.appendChild(seatGrid);
  });
}

function viewSector(sectorIndex) {
  // hide screen
  document.querySelector('.screen-container').style.display = "none";

  // Hide all sectors and show only the selected sector's seat grid
  document.querySelectorAll('.sector').forEach((sector, idx) => {
    sector.classList.toggle('hidden');
  });
  document.querySelectorAll('.seat-grid').forEach((grid, idx) => {
    grid.classList.toggle('visible', idx === sectorIndex);
  });

  // Show the back button to return to all sectors
  backButton.classList.add('visible');
}

function showAllSectors() {
  // show screen
  document.querySelector('.screen-container').style.display = "flex";

  // Show all sectors and hide all seat grids
  document.querySelectorAll('.sector').forEach(sector => {
    sector.classList.remove('hidden');
  });
  document.querySelectorAll('.seat-grid').forEach(grid => {
    grid.classList.remove('visible');
  });

  // Hide the back button
  backButton.classList.remove('visible');
}

function toggleSeatSelection(event, seatId) {
  event.stopPropagation();
  if (selectedSeats.includes(seatId)) {
    selectedSeats = selectedSeats.filter(seat => seat !== seatId);
    event.target.classList.remove('selected');
  } else {
    selectedSeats.push(seatId);
    event.target.classList.add('selected');
  }
}

function checkout() {
  if (selectedSeats.length) {
    alert(`Checking out with seats: ${selectedSeats.join(', ')}`);

    // Clear selected seats array and UI
    selectedSeats = [];
    document.querySelectorAll('.selected').forEach(seat => {
      seat.classList.remove('selected');
      seat.classList.add('unavailable');
    });
  }
}

renderSectors();
