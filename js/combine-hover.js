let cards = document.getElementsByClassName('card-link')

for (item of cards){
    item.onmouseover = function() {
        let button = this.getElementsByClassName('hover-special')
        $(button).addClass("trigger-hover-special");
    }
    item.onmouseout = function() {
        let button = this.getElementsByClassName('hover-special')
        $(button).removeClass("trigger-hover-special");
    }
    item.onclick = function() {
        this.getElementsByClassName('hover-special')[0].click()
    }
}
