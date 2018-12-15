const latestExchangeUrl = 'https://openexchangerates.org/api/latest.json'
const appId = 'ac7cb140ebe1462da07fd32b66c229ec'

export async function fetchExchanges() {
    const url = new URL(latestExchangeUrl)
    url.searchParams.append('app_id', appId)

    return await fetch(url.toString())
}