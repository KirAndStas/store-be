# SESSIONS CREATE
-----------------

## Request

    POST /api/v1/sessions

```javascript
    {
        "data": {
            "email": "user@mail.com",
            "password": "some pass"
        }
    }
```

## Response

```javascript
{
    "status": 1,
    "data": {
        "jwt": "5321d7eaf69e47e24b000001..."
    }
}
```
