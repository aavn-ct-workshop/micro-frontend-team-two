document.getElementsByClassName('dummy-amount-200000')[0]?.addEventListener("click", () => {
    this.dispatchEvent(
        new CustomEvent("team-one-current-amount", {
            bubbles: true,
            detail: { 'amount': 200000 }
        })
    );
});

document.getElementsByClassName('dummy-amount-1000000')[0]?.addEventListener("click", () => {
    this.dispatchEvent(
        new CustomEvent("team-one-current-amount", {
            bubbles: true,
            detail: { 'amount': 1000000 }
        })
    );
});

window.addEventListener("team-two-buy", (e) => {
    console.log("receive event " + e.detail['product-type']);
    document.getElementsByClassName('dummy-receipt')[0].innerHTML = `buy ${e.detail['product-type']}`;
});

window.addEventListener("team-two-sell", (e) => {
    console.log("receive event " + e.detail['product-type']);
    document.getElementsByClassName('dummy-receipt')[0].innerHTML = `sell ${e.detail['product-type']}`;
});