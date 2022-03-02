module.exports = {
    transpileDependencies: ['vuetify'],
    devServer: {
        proxy: {
            '/gw-sy': {
                target: 'https://tdp-dev.lenovo.com',
                secure: false,
                changeOrgin: true,
                headers: {
                    Authorization:
                        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJnZXQgdXNlciBpbmZvIiwiYXVkIjoidGRwLWRldi5sZW5vdm8uY29tLyMvcHJvamVjdE5ldyIsImlzcyI6InRkcC1kZXYubGVub3ZvLmNvbSIsImV4cCI6MTY0NjIyOTE2MCwidXNlciI6eyJhbGxvdyI6dHJ1ZSwicGVybWl0dGVkIjpmYWxzZSwibG9naW5UeXBlIjoidWNhIiwiY2xpZW50SXAiOm51bGwsInBhdGhMaXN0Ijp7Ik9USEVSIjpbIi93ZWItZGF0YS1tb2RlbGVyLyIsIi9hcGktbWdyLyIsIi9tcy1pbmJveC8iLCIvbGF1bmNoLWJveC1iYWNrZW5kLyIsIi93Zi9zeXMvd2YvIiwiL3VpZGVzaWduZXIvIiwiL3BvcnRhbC1iYWNrZW5kLyIsIi91aS1kZXNpZ25lci8iLCIvdWktcmVwby8iLCIvYW5hbHl0aWNzLyIsIi9hcGktcmVwby8iLCIvcmVzLW1nci8iLCIvYXBpbS8iLCIvcmVzLXJlcG8vIiwiL2xhdW5jaC1ib3gvIiwiL2RhdGEtbW9kZWxlci1kZXNpZ250aW1lLyIsIi9hcGltLXYwLjkvIiwiL3BvcnRhbC8iLCIvd2YvYXBpLyIsIi9hY3Rpdml0aS8iLCIvdWktcmVwby8iXX0sInVzZXJJZCI6IjgyMzU2MTU2NDAiLCJyZWFsbmFtZSI6IiVFOSU4MyU5RCVFNSVBRSU4MSVFOSU5QyU5RSIsInVzZXJuYW1lIjoiaGFvbng0In0sImlhdCI6MTY0NjE4NTk2MCwia2V5IjoidGRwLWNvbnN1bWVyIn0.ghqi7BrS8J6tGmeqJGvYwaWjxsxEB6mCTRDclxJsZu2RgT8J7iR24KU_n9COCGstWyNKaqdXolYZAgZPU0E385xpZy0EwThZlg9gdrhI8pTJEmcssGf6RMP6loG30zjpboH33Wmm_veMzLdlEAqwMgThaFsSnua9KDx7j_RMa1cqP4jusPgUH_RGeVBfxUzFfTWP7gprXIS4FUNr3NFLONSO7GHRZrEpMXsCHkBqhZXgUH6fGGpjfimkZ_oGR7dCsGexyEyTXYzdQmkGZJgXnjFM7AeZok9dsW87sZE1MMJ2qO5Ulwe6mG7ZFaTgIHhj2D5-DwdxP72UZkXkhCvSqg',
                },
            },
        },
    },
};
