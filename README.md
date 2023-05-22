# Assessment
* [API link](https://unisach-dev.onrender.com/)
* [Postman docs link](https://www.postman.com/devstrike/workspace/unisach-public/overview)

# Documentation
* [Authentication](#authentication)
* [Order](#order)


*   ### Authentication
    This are the following routes used for the authentication process for the API
    *   [Signup (local strategy)](#signup)
    *   [login](#login)
    *   [logout](#resend-otp)

    #

    ### Signup
    * Route - 
        ```
            POST - /customers
        ```
    * Request
        ```json
        {
        "name": "john doe",
        "email": "john@gmail.com",
        "password": "test1234",
        "address": "Albaquque new mexico"
        }
        ```

    * Response
        ```javascript
            status: 200
        ```
        ```json
            successful
        ```
        #
        ```javascript
            status: 400
        ```
        ```json
            {
            "message": "Error: email exist"
            }
        ```

     ### Login
    * Route
        ```
        POST - customers/login
        ```
    * Request
        ```json
            {
                "email": "johndoe@gmail.com",
                "password": "test1234"
            }
        ```
    * Response 
        ```javascript
            status: 200
        ```
        ```json
            {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg0NzMwNzc5LCJleHAiOjE2ODczMjI3Nzl9.LsOwym0tQMqlIAcE_jrVRcOnHnZYeVV4wevsK1ARz8U",
                "customer": {
                    "name": "john doe",
                    "address": "Albaquque new mexico",
                    "email": "john@gmail.com",
                    "id": 1
                }
            }      
        ```
        #
        ```javascript
            status: 400
        ```
        ```json
            {
                "data": "incorrect email or password"
            }
        ```


    * ### Order
    This are the following routes used for user CRUD<br>
    **NB: Authenticated routes**
    * [create order](#getme)
    * [checkout order](#update-user)
    * [update order status](#update-password)
    * [complete payment](#deactivate-or-delete-account)

    #
