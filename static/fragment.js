class ProductItem extends HTMLElement {
    static get observedAttributes() {
        return ["product-type"];
    }
    connectedCallback() {
        this.products = this.fetchProducts();
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
        this.products = this.fetchProducts();
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
    fetchProducts() {
        return {
            airpods: { name: "Airpods", price: "199000", img: "airpods.jpg" },
            shoe: { name: "Air Jordans", price: "125000", img: "air-jordans.jpg" },
            iphone: { name: "Smartphone", price: "699000", img: "smartphone.jpg" },
            book: { name: "Book", price: "15000", img: "book.jpg" },
            bike: { name: "Bike", price: "800000", img: "bike.jpg" },
            videoGame: { name: "Gaming Console", price: "299000", img: "video-game.jpg" },
            movieTicket: { name: "Movie Ticket", price: "12000", img: "movie-ticket.jpg" },
            amazonEcho: { name: "Amazon Echo", price: "99000", img: "amazon-echo.jpg" },
            drone: { name: "Drone", price: "350000", img: "drone.jpg" }
        };
    }
}
window.customElements.define("product-item", ProductItem);