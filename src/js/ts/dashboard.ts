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
            backgroundColor: "#FF2222",
            borderColor: "#FF2222",
            fill: false
        }, {
            label: "Protein",
            data: []
        }, {
            label: "Dairy",
            data: []
        }, {
            label: "Fruit",
            data: []
        }, {
            label: "Vegetables",
            data: []
        }]
    },
    options: {

    }
});