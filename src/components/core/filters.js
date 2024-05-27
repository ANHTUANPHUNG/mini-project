
export const filters = {
    install(Vue) {
        Vue.filter(
            'formatNumberWithDotAndCurrency', number => {
                let numStr = number.toString().replace(/^0+/, "");
            let formattedNum = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            return formattedNum + " đ";
            }
        )
    },
}
