# Sure Backend

Template for creating simple scalable backend

### Some Tools Used

- Typescript
- Express
- Mongoose
- jwt (Access & Refresh Implemented)

### API's Implemented
#### Base

Api Authorization Protocol: Bearer Token

```bash
http://localhost/api/v1/
```

#### Authorization
Requires Authorization: No

##### Register
```bash
{base}/register 
```

Request Body
```bash
{
  firstName: string
  lastName: string
  mobile: string
  email: string
  password: string
}
```
##### Login
```bash
{base}/login
```

Request Body
```bash
{
  email: string
  password: string
}
```
### User Details

Types: Get and Update
```bash
{base}/user
```

If Update
```bash
{
  fields to update
}
```
### User Image
Types: Update
```bash
{base}/image
```

### Static Files (Image & Files)
```bash
{base}/static/<path to the image>

ie {base}/static/images/user.png
```

### Install the packages
```bash
npm install
```

### Run the project
```bash
npm start
```

### During development

```bash
npm run dev
```
