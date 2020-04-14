import cheerio from 'cheerio'
import axios from 'axios'
import queryString from 'query-string'
import { convertStringToNumber,  removeLineBreaks } from './helpers'

export async function getStandVirtual({ page = 1 }) {
  const link = `https://www.standvirtual.com/carros/audi--bmw/?search[filter_float_price:from]=1000&search[filter_float_price:to]=8000&search[filter_enum_damaged]=0&search[order]=created_at:desc&view=list&page=${page}`
  try {
  // get html from page
  const { data: html } = await axios.get(link)

  // use cheerio to parse the data we want
  const $ = cheerio.load(html)
  const lastPage = $('ul.om-pager').children().nextUntil('.next').last().text().trim()
  const totalPages = convertStringToNumber(lastPage)
  const items = $(`article`)
  const data = items.map((i, el) => {
    const link = $(el).attr('data-href')

    // img
    const img = $(el).find('img').attr('data-src')
    // remove size transformer
    const imgClean = img.split(';')[0]

    const title = $(el).find('a.offer-title__link').attr('title').trim()
    const price = $(el).find('.offer-price__number').children().first().text()
    return {
        title,
        link,
        img: imgClean,
        price: convertStringToNumber(price),
        provider: 'stand virtual',
    }
  }).get()
  return {
    info: {
      currentPage: page,
      totalPages,
      link,
      provider: 'stand virtual',
    },
    list: data,
  }
  } catch (err) {
    throw new Error(err.message || 'error scraping standvirtual')
  }
}

export async function getAutoSapo({ page = 1 }) {
  const link = `https://auto.sapo.pt/carros/pesquisa/Audi?bmv=4,8&xp=8000&mp=1000&psz=2&lst=True&pi=${page}`
  try {
  // get html from page
  const { data: html } = await axios.get(link)

  // use cheerio to parse the data we want
  const $ = cheerio.load(html)
  const lastPage = $('ul.pagination').children().nextUntil('.next').last().text().trim()
  const totalPages = convertStringToNumber(lastPage)
  const items = $(`article`)
  const data = items.map((i, el) => {
    const link = $(el).find('a').attr('href')
    const url = `https://auto.sapo.pt${link}`
    // img
    const img = $(el).find('img').attr('src')
    const imgSrc = `https:${img}`
    const title = $(el).find('h3').text().trim()
    const price = $(el).find('.price .units').text()
    return {
        title,
        link: url,
        img: imgSrc,
        price: convertStringToNumber(price),
        provider: 'autosapo',
    }
  }).get()
  return {
    info: {
      currentPage: page,
      totalPages,
      link,
      provider: 'autosapo',
    },
    list: data,
  }
  } catch (err) {
    throw new Error(err.message || 'error scraping autosapo')
  }
}

export async function getCustoJusto({ page = 1, model = 'bmw'}) {
  const link = `https://www.custojusto.pt/portugal/carros-usados/${model}?br=3pe=9&ps=2&si=0&st=a&o=${page}`
  try {
  // get html from page
  const { data: html } = await axios.get(link)

  // use cheerio to parse the data we want
  const $ = cheerio.load(html)
    const pagination = $('ul.pagination.pull-left').get(1)
    const lastPageUrl = $(pagination).find('a').attr('href')
    const { o: lastPage } = queryString.parse(lastPageUrl)
  const totalPages = convertStringToNumber(lastPage)
  const items = $(`.container_related`)
  const data = items.map((i, el) => {
    const link = $(el).find('a').attr('href')
    // img
    const imgLazySrc = $(el).find('img').attr('lazy-src')
    const imgSrc = $(el).find('img').attr('src')
    const img = imgSrc || imgLazySrc
    const title = $(el).find('h2').text()
    const price = $(el).find('h5').text()
    return {
        title: removeLineBreaks(title),
        link,
        img,
        price: convertStringToNumber(price),
        provider: 'custo justo',
    }
  }).get()
    const cleanData = data.reduce(
      (acc, curr) => {
        if (curr.price === 0) return acc
        return [...acc, curr]
      },
      [],
    )

  return {
    info: {
      currentPage: page,
      totalPages,
      link,
      provider: 'custo justo',
    },
    list: cleanData,
  }
  } catch (err) {
    throw new Error(err.message || 'error scraping autosapo')
  }
}


export async function getOlx({ page = 1, model = "bmw" }) {
  const link = `https://www.olx.pt/carros-motos-e-barcos/carros/${model}/?search[filter_float_price:from]=1000&search[filter_float_price:to]=8000&search[description]=1&page=${page}`
  try {
  // get html from page
  const { data: html } = await axios.get(link)

  // use cheerio to parse the data we want
  const $ = cheerio.load(html)
  const lastPage = $('.pager').children().nextUntil('.next').last().text().trim()
  const totalPages = convertStringToNumber(lastPage)
  const items = $(`.offer-wrapper`)
  const data = items.map((i, el) => {
    const link = $(el).find('h3 a').attr('href')
    // img
    const img = $(el).find('img').attr('src')
    const title = $(el).find('h3').text().trim()
    const price = $(el).find('p.price').text()
    return {
        title,
        link,
        img,
        price: convertStringToNumber(price),
        provider: 'olx',
    }
  }).get()
  return {
    info: {
      currentPage: page,
      totalPages,
      link,
      provider: 'olx',
    },
    list: data,
  }
  } catch (err) {
    throw new Error(err.message || 'error scraping autosapo')
  }
}