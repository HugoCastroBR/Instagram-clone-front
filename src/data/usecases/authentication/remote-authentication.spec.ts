import { HttpPostClientSpy } from "../../test/mock-http-client"
import { RemoteAuthentication } from "./remote-authentication"



type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy : HttpPostClientSpy
}

const makeSut = (url:string ='any_url'): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)
  return{
    sut,
    httpPostClientSpy
  }
}


describe('RemoteAuthentication', () => {
  test('should call httpPostClient with correct URL',() => {
    const url = 'other_url'
    const { sut, httpPostClientSpy } = makeSut(url)
    sut.auth()
    expect(httpPostClientSpy.url).toBe(url)
  })
})