![image info](https://blockchain.uj.ac.za/static/images/main-logo.png)

# SARChI
South Africa-Switzerland Bilateral Research Chair in Blockchain Technology aims to explore blockchain integrations with real-world applications and development in Agric food.

# Hedera Testnet
Set environment variables for Hedera Testnet using Viper. A testnet account can be created from https://portal.hedera.com/register. Replace "..." with your credentials.

`
ACCOUNT_ID: ...
PUBLIC_KEY: ...
PRIVATE_KEY: ...
ENCODED_PRIVATE_KEY: ...
HEDERA_NETWORK: ...
`

# Database
Set environment variable for postgres database using Viper. Database connection is needed for Gorm. Replace "..." with your credentials.

`
DNS: "host=localhost user=postgres password=... dbname=... port=... sslmode=disable TimeZone=Africa/Johannesburg"
`

## Deployment
Follow step by step gist for deployment using: [Deployment](https://gist.github.com/ujblockchain/9152d51a574791ed95b7e4a39ae83a18)