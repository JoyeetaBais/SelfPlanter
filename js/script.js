// function updateProgress(progressPercentage) {
//   const circumference = Math.PI * 20 * 2; // 2 * radius (20) * pi
//   const offset = circumference - (progressPercentage / 100) * circumference;
//   document.querySelector('.progress-bar').style.strokeDasharray = `${offset} ${circumference - offset}`;
//   document.querySelector('.progress-label').textContent = `${progressPercentage}%`;
// }

// // Example: Update progress every second
// let progress = 0;
// const intervalId = setInterval(() => {
//   progress += 5;
//   if (progress > 100) progress = 0;
//   updateProgress(progress);
// }, 1000);



// camera feed

        // Fetch data from the API
        fetch('http://10.241.201.94:8000/uart_data')
            .then(response => response.json())
            .then(data => {
                document.getElementById('water').textContent = data.soil_moisture;
                document.getElementById('npk').textContent = data.nitrogen;
                document.getElementById('temp').textContent = data.temperature;
                document.getElementById('aqi').textContent = data.air_quality;
            })
            .catch(error => console.error('Error fetching data:', error));
