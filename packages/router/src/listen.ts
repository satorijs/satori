import net from 'net'

export interface ListenOptions {
  host: string
  port: number
  maxPort?: number
}

export function listen({ host, port, maxPort = port }: ListenOptions) {
  const server = net.createServer()

  return new Promise<number>((resolve, reject) => {
    function onListen() {
      server.off('error', onError)
      server.close((err) => {
        err ? reject(err) : resolve(port)
      })
    }

    function onError(err: NodeJS.ErrnoException) {
      server.off('listening', onListen)
      if (!(err.code === 'EADDRINUSE' || err.code === 'EACCES')) {
        return reject(err)
      }
      port++
      if (port > maxPort) {
        return reject(new Error('No open ports available'))
      }
      testPort()
    }

    function testPort() {
      server.once('error', onError)
      server.once('listening', onListen)
      server.listen(port, host)
    }

    testPort()
  })
}
