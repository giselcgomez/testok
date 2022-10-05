module.exports = {
    async headers() {
      return [
        { 
          source: '/login',
          headers: [
            {
              key: 'Content-Type',
              value: 'application/json',
            },
          ],
        },
      ]
    },
  }
  