import { toggleNavbar } from "./_navbar.js";
let Chart = window.Chart;

document.getElementById("navbar-toggle").addEventListener("click", toggleNavbar);

var history = new Chart("history-chart", {
    type: "line",
    data: {
        labels: ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [{
            label: "Grains",
            data: [0.5,0.4,0.3,0.6,0.8,0.2,0.2,0.1,0.3,0.4,0.6,0.2],
            backgroundColor: "#da7b1c",
            borderColor: "#da7b1c",
            fill: false
        }, {
            label: "Protein",
            data: [0.2,0.4,0.6,0.3,0.7,0.4,0.7,0.8,0.0,0.2,0.6,0.5],
            backgroundColor: "#6b4c9a",
            borderColor: "#6b4c9a",
            fill: false
        }, {
            label: "Dairy",
            data: [0.7,0.3,0.4,0.5,0.6,0.1,0.2,0.8,0.9,0.2,0.3,0.6],
            backgroundColor: "#3969b1",
            borderColor: "#3969b1",
            fill: false
        }, {
            label: "Fruit",
            data: []
        }, {
            label: "Vegetables",
            data: []
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    suggestedMax: 1
                }
            }]
        }
    }
});