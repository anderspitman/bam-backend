const { RPCServer, call } = require('iobio-backend');

const rpcConfig = {

  getAlignmentHeader: {
    params: {
      url: 'URL',
    },
    pipeline: (params) => call('samtools', ['view', '-H', params.url]),
  },

  bamReadDepther: {
    params: {
      url: 'URL',
    },
    pipeline: (params) =>
      call('curl', [params.url], { ignoreStderr: true })
        .pipe(call('bamReadDepther')),
  },

  bamstatsAlive: {
    params: {
      url: 'URL',
      regions: 'String',
      regionStr: 'String',
    },
    pipeline: (params) => {

      const regions = params.regions.split(' ');

      return call('samtools', ['view', '-b', params.url].concat(regions))
        .pipe(call('samtools', ['view', '-b', params.url].concat(regions)))
        .pipe(call('bamstatsAlive', ['-u', '500', '-k', '1', '-r', params.regionStr]));
    },
  },

};


const server = new RPCServer(rpcConfig);
server.start(9001);
