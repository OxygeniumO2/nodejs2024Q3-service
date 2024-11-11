# Home Library Service

This project is a simple RESTful API service built with Node.js. It allows managing `User`, `Artists`, `Tracks`, `Albums`, and `Favorites` entities, providing full CRUD functionality and conforms to specific REST API requirements.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)

## Installation

1. **Install NodeJS and Git**:

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

2. **Clone the repository**:

   ```bash
   git clone https://github.com/OxygeniumO2/nodejs2024Q3-service
   cd nodejs2024Q3-service
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

---

## Usage

**Start the server**:

```bash
npm start
```

By default, the server will run on `http://localhost:4000`.

---

## API Endpoints

### Users

| Method | Endpoint        | Description       |
| ------ | --------------- | ----------------- |
| GET    | `/user`         | Get all users     |
| GET    | `/user/:id`     | Get user by ID    |
| POST   | `/user`         | Create new user   |
| PUT    | `/user/:id`     | Update user by ID |
| DELETE | `/user/:userId` | Delete user by ID |

### Artists

| Method | Endpoint      | Description         |
| ------ | ------------- | ------------------- |
| GET    | `/artist`     | Get all artists     |
| GET    | `/artist/:id` | Get artist by ID    |
| POST   | `/artist`     | Create new artist   |
| PUT    | `/artist/:id` | Update artist by ID |
| DELETE | `/artist/:id` | Delete artist by ID |

### Tracks

| Method | Endpoint     | Description        |
| ------ | ------------ | ------------------ |
| GET    | `/track`     | Get all tracks     |
| GET    | `/track/:id` | Get track by ID    |
| POST   | `/track`     | Create new track   |
| PUT    | `/track/:id` | Update track by ID |
| DELETE | `/track/:id` | Delete track by ID |

### Albums

| Method | Endpoint     | Description        |
| ------ | ------------ | ------------------ |
| GET    | `/album`     | Get all album      |
| GET    | `/album/:id` | Get album by ID    |
| POST   | `/album`     | Create new album   |
| PUT    | `/album/:id` | Update album by ID |
| DELETE | `/album/:id` | Delete album by ID |

### Favorites

| Method | Endpoint           | Description                        |
| ------ | ------------------ | ---------------------------------- |
| GET    | `/favs`            | Get all favorites                  |
| POST   | `/favs/track/:id`  | Add track to the favorites         |
| POST   | `/favs/album/:id`  | Add album to the favorites         |
| POST   | `/favs/artist/:id` | Add artist to the favorites        |
| DELETE | `/favs/track/:id`  | Delete track by id from favorites  |
| DELETE | `/favs/album/:id`  | Delete album by id from favorites  |
| DELETE | `/favs/artist/:id` | Delete artist by id from favorites |

---

## Examples

### Users

#### Create User

**POST** `/user`

- **Request Body:**

  ```json
  {
    "login": "user_login",
    "password": "user_password"
  }
  ```

- **Response:**
  ```json
  {
    "id": "uuid_v4",
    "login": "user_login",
    "version": 1,
    "createdAt": 1630000000000,
    "updatedAt": 1630000000000
  }
  ```

#### Update User Password

**PUT** `/user/:id`

- **Request Body:**

  ```json
  {
    "oldPassword": "old_password",
    "newPassword": "new_password"
  }
  ```

- **Response:**
  ```json
  {
    "id": "uuid_v4",
    "login": "user_login",
    "version": 2,
    "createdAt": 1630000000000,
    "updatedAt": 1630100000000
  }
  ```

### Artists

#### Create Artist

**POST** `/artist`

- **Request Body:**

  ```json
  {
    "name": "artist_name",
    "grammy": false
  }
  ```

- **Response:**
  ```json
  {
    "id": "uuid_v4",
    "name": "artist_name",
    "grammy": false
  }
  ```

#### Get Artist by ID

**GET** `/artist/:id`

- **Response:**
  ```json
  {
    "id": "uuid_v4",
    "name": "artist_name",
    "grammy": false
  }
  ```

### Tracks

#### Create Track

**POST** `/track`

- **Request Body:**

  ```json
  {
    "name": "track_name",
    "artistId": "uuid_v4_or_null",
    "albumId": "uuid_v4_or_null",
    "duration": 210
  }
  ```

- **Response:**
  ```json
  {
    "id": "uuid_v4",
    "name": "track_name",
    "artistId": "uuid_v4_or_null",
    "albumId": "uuid_v4_or_null",
    "duration": 210
  }
  ```

#### Get Track by ID

**GET** `/track/:id`

- **Response:**
  ```json
  {
    "id": "uuid_v4",
    "name": "track_name",
    "artistId": "uuid_v4_or_null",
    "albumId": "uuid_v4_or_null",
    "duration": 210
  }
  ```

### Albums

#### Create Album

**POST** `/album`

- **Request Body:**

  ```json
  {
    "name": "album_name",
    "year": 2021,
    "artistId": "uuid_v4_or_null"
  }
  ```

- **Response:**
  ```json
  {
    "id": "uuid_v4",
    "name": "album_name",
    "year": 2021,
    "artistId": "uuid_v4_or_null"
  }
  ```

#### Get Album by ID

**GET** `/albums/{albumId}`

- **Response:**
  ```json
  {
    "id": "uuid_v4",
    "name": "album_name",
    "year": 2021,
    "artistId": "uuid_v4"
  }
  ```

### Favorites

#### Get All Favorites

**GET** `/favs`

- **Response:**
  ```json
  {
    "artists": [
      {
        "id": "uuid_v4",
        "name": "artist_name",
        "grammy": true
      }
    ],
    "albums": [
      {
        "id": "uuid_v4",
        "name": "album_name",
        "year": 2021,
        "artistId": "uuid_v4_or_null"
      }
    ],
    "tracks": [
      {
        "id": "uuid_v4",
        "name": "track_name",
        "artistId": "uuid_v4_or_null",
        "albumId": "uuid_v4_or_null",
        "duration": 210
      }
    ]
  }
  ```

#### Add Artist to Favorites

**POST** `/favs/artist/:id`

#### Add Album to Favorites

**POST** `/favs/album/:id`

#### Add Track to Favorites

**POST** `/favs/track/:id`

#### Remove Artist from Favorites

**DELETE** `/favs/artist/:id`

- **Response:** `204 No Content`

#### Remove Album from Favorites

**DELETE** `/favs/album/:id`

- **Response:** `204 No Content`

#### Remove Track from Favorites

**DELETE** `/favs/track/:id`

- **Response:** `204 No Content`

---

## Typescript interfaces

```ts
interface User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

interface Artist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}

interface Track {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

interface Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

interface Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

interface CreateUserDto {
  login: string;
  password: string;
}

interface UpdatePasswordDto {
  oldPassword: string; // previous password
  newPassword: string; // new password
}

interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
```

---

## Testing

To run tests, use:

```bash
npm run test
```
