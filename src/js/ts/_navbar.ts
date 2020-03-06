export function toggleNavbar() {
    console.log("navbar toggled");
    var navbar = document.getElementById("navbar");
    if (navbar.className === "responive") {
        navbar.className = "";
    }
    else {
        navbar.className = "responsive";
    }
}