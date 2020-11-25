class ProductItem extends HTMLElement {
    static get observedAttributes() {
        return ["product-type"];
    }
    connectedCallback() {
        this.products = this.fetchProduct();
        this.render();
        const productType = this.getAttribute("product-type");
        const product = this.products[productType];
        this.getElementsByClassName('sell-button')[0]?.addEventListener("click", () => {
            console.log("Sell");
            this.dispatchEvent(
                new CustomEvent("team-two-sell", {
                    bubbles: true,
                    detail: { 'product-type': productType }
                })
            );
        });
        this.getElementsByClassName('buy-button')[0]?.addEventListener("click", () => {
            console.log("Buy");
            this.dispatchEvent(
                new CustomEvent("team-two-buy", {
                    bubbles: true,
                    detail: { 'product-type': productType }
                })
            );
        });
        window.addEventListener("team-one-current-amount", (e) => {
            console.log('receive amount event');
            if (product.price > e.detail['amount']) {
                this.getElementsByClassName('buy-button')[0]?.classList.add('button-disable');
            } else {
                this.getElementsByClassName('buy-button')[0]?.classList.remove('button-disable');
            }

        });
    }
    attributeChangedCallback() {
        this.products = this.fetchProduct();
        this.render();
    }
    render() {
        console.log('load');
        const productType = this.getAttribute("product-type");
        const product = this.products[productType];
        this.innerHTML = `
        <div class="pricing-table-header">
            <span class="pricing-table-price">
                <img class="price-image" src="images/${product.img}">
                <span class="price-name">${product.name}</span>
                <span class="price-value price">$${product.price}</span>
            </span>
        </div>
        <div class="pricing-table-footer">
            <button class="sell-button pure-button">
                Sell
            </button>
            <button class="buy-button pure-button pure-button-primary">
                Buy
            </button>
        </div>
        `;
        
    }
    fetchProduct() {
        return {
            airpods: { name: "Airpods", price: "199", img: "airpods.jpg" },
            shoe: { name: "Air Jordans", price: "125", img: "air-jordans.jpg" },
            iphone: { name: "Smartphone", price: "699", img: "smartphone.jpg" },
            book: { name: "Book", price: "15", img: "book.jpg" },
            bike: { name: "Bike", price: "800", img: "bike.jpg" },
            videoGame: { name: "Gaming Console", price: "299", img: "video-game.jpg" },
            movieTicket: { name: "Movie Ticket", price: "12", img: "movie-ticket.jpg" },
            amazonEcho: { name: "Amazon Echo", price: "99", img: "amazon-echo.jpg" },
            drone: { name: "Drone", price: "350", img: "drone.jpg" }
        };
    }
}
window.customElements.define("product-item", ProductItem);