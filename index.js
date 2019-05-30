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

  bamReadDepther: {
    params: {
      url: 'URL',
    },
    pipeline: (params) => {
      return [
        ['curl', params.url],
        ['bamReadDepther'],
      ];
    },
  },

  bamStatsAlive: {
    params: {
      url: 'URL',
      regions: 'String',
      regionStr: 'String',
    },
    pipeline: (params) => {

      const regions = params.regions.split(' ');

      return [
        ['samtools', 'view', '-b', params.url].concat(regions),
        ['bamstatsAlive', '-u', '500', '-k', '1', '-r', params.regionStr],
      ];
    },
  },

};


const server = new RPCServer(rpcConfig);
server.start(9001);
