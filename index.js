const { RPCServer } = require('iobio-backend');

const rpcConfig = {

  getAlignmentHeader: {
    params: {
      url: 'URL',
    },
    pipeline: (params) => {
      return [
        ['samtools', 'view', '-H', params.url],
      ];
    },
    returnStream: false,
  },

  getAlignment: {
    params: {
      url: 'URL',
      chr: 'String',
    },
    pipeline: (params) => {
      return [
        ['samtools', 'view', params.url, params.chr],
      ];
    },
  },

};


const server = new RPCServer(rpcConfig);
server.start(9001);
