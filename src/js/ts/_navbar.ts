export function toggleNavbar() {
    console.log("navbar toggled");
    var navbar = document.getElementById("navbar");
    if (navbar.className === "responsive") {
        navbar.className = "";
    }
    else {
        navbar.className = "responsive";
    }
}