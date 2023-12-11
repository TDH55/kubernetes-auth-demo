import { Elysia, t } from "elysia";

interface TokenReview {
  apiVersion: string
  kind: string
  spec: {
    token: string
  }
}

interface UserInfo {
  username: string
  uid: string
  groups: string[]
  extra?: any[]
}


const app = new Elysia({ serve: { certFile: 'cert.pem', keyFile: 'key.pem' }})
  .get("/", () => "Hello Elysia")
  .post('/auth', ({ body }) => {
    console.log('body', body)

    // unauthenticated?
    return null
    // return {
    //   apiVersion: 'authentication.k8s.io/v1beta1',
    //   kind: 'TokenReview',
    //   status: {
    //     authenticated: true,
    //     user: {
    //       username: 'john_doe',
    //       uid: '1234567890',
    //       groups: ['group1', 'group2']
    //     }
    //   }
    // }
  }, {
    body: t.Object({
      apiVersion: t.String(),
      kind: t.String(),
      spec: t.Object({
        token: t.String(),
      }),
    })
  })

app.listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
