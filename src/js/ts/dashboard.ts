import { toggleNavbar } from "./_navbar.js";
declare let moment: any;
let Chart = window.Chart;

document.getElementById("navbar-toggle").addEventListener("click", toggleNavbar);

var history = new Chart("history-chart", {
    type: "line",
    data: {
        labels: [ moment().format("ll"), moment().format("ll"), moment().format("ll"), moment().format("ll"), moment().format("ll"), moment().format("ll"), moment().format("ll"), moment().format("ll"), moment().format("ll"), moment().format("ll"), moment().format("ll"), moment().format("ll")],
        datasets: [{
            label: "Grains",
            data: [0.2,0.2,0.3,0.1,0.4,0.1,0.2,0.1,0.2,0.1,0.1,0.2],
            backgroundColor: "#da7b1c",
            borderColor: "#da7b1c",
            pointBorderColor: "#FFFFFF"
        }, {
            label: "Protein",
            data: [0.2,0.1,0.4,0.2,0.1,0.1,0.3,0.0,0.0,0.6,0.2,0.4],
            backgroundColor: "#6b4c9a",
            borderColor: "#6b4c9a",
            pointBorderColor: "#FFFFFF"
        }, {
            label: "Dairy",
            data: [0.2,0.3,0.1,0.2,0.1,0.2,0.3,0.1,0.4,0.2,0.3,0.1],
            backgroundColor: "#3969b1",
            borderColor: "#3969b1",
            pointBorderColor: "#FFFFFF"
        }, {
            label: "Fruit",
            data: [0.2,0.3,0.1,0.2,0.1,0.2,0.1,0.0,0.1,0.1,0.3,0.1],
            backgroundColor: "#cc2528",
            borderColor: "#cc2528",
            pointBorderColor: "#FFFFFF"
        }, {
            label: "Vegetables",
            data: [0.2,0.1,0.1,0.3,0.3,0.4,0.1,0.8,0.3,0.0,0.1,0.2],
            backgroundColor: "#3e9651",
            borderColor: "#3e9651",
            pointBorderColor: "#FFFFFF"
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    max: 1
                },
                stacked: true
            }]
        }
    }
});