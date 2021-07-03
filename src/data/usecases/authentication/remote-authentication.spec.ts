interface HttpPostClient {
  post (url:string) : Promise<void>
}

class RemoteAuthentication {
  constructor(
      private readonly url:string,
      private readonly httpPostClient: HttpPostClient
  ){
    
  } 

  async auth (): Promise<void>{
    await this.httpPostClient.post(this.url)
    return Promise.resolve()
  }
}

const RemoteAuthenticationFactory = (url:string,httpPostClient:HttpPostClient) => (
  new RemoteAuthentication(url,httpPostClient)
)

describe('RemoteAuthentication', () => {
  test('should call httpPostClient with correct URL',() => {

    class HttpPostClientSpy implements HttpPostClient{
      url?: string

      async post (url:string): Promise<void> {
        this.url = url
        return Promise.resolve()
      }
    }

    const url = 'any_url'
    const httpPostClientSpy = new HttpPostClientSpy()
    const sut = RemoteAuthenticationFactory(url,httpPostClientSpy)
    sut.auth()
    expect(httpPostClientSpy.url).toBe(url)
  })
})