
export function currency(num){
    let comma=/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g
    return num.toString().replace(comma, ',')
}
export function toData(time){
    const localDate = new Date(time * 1000)
    return localDate.toLocaleDateString()
}