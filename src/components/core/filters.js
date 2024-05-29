
export const filters = {
    install(Vue) {
        Vue.filter(
            'formatNumberWithDotAndCurrency', number => {
                if(number !=0){
                    let numStr = number.toString().replace(/^0+/, "");
            let formattedNum = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            return formattedNum + " đ";
                } return 0 + " đ"
            }
        )
        Vue.filter(
            'convertDate', date => {
                let day=  `${date.getFullYear()}-` +
              `${date.getMonth() + 1}-` +
              `${date.getDate()}` 
              return day
            }
        )
    },
}
