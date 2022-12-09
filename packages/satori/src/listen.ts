import net from 'net'

export interface ListenOptions {
  host?: string
  port?: number
  maxPort?: number
}

export function listen(server: net.Server, { host, port, maxPort = port }: ListenOptions) {
  return new Promise<number>((resolve, reject) => {
    function onListen() {
      server.removeListener('error', onError)
      resolve(port)
    }

    function onError(err: NodeJS.ErrnoException) {
      server.removeListener('listening', onListen)
      if (!(err.code == 'EADDRINUSE' || err.code == 'EACCES')) {
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
