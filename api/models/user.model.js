import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAxgMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAwUBAgYEB//EADYQAQACAQMCAwMLAgcAAAAAAAABAgMEETEFIRJBURNhcSIjMkJSYoGRscHRFPAVM0NTcqGi/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APqoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATMViZtMREczKp1nVLWnwaXtWP9Tzn4As8ufFijfLkrT4y8luq6av0Zvf4V2/VSza1rTa0zNvtT5gLf/GMP+1liPXt/KXH1PS37Te1P+Ve35qMB09b1vWLUtFqzxMTuy5nDlvgt4sdprM+i30XUa5pjHm2pk8p8rfwD3gAAAAAAAAAAAAAAAMx3YePqmecOnmKz8u8+GPdHmDwdT1vt7zjwzPsq9pn7UvBBEbMgAAAAMMgLjpWs9rHscsz44+jM/Wj+Vi5il7Y7Rek7Wr3h0mnyxnwUyx9aN/xBuAAAAAAAAHwAAAAAFH1jJN9X4Y+jSsR+M8/svHO6+d9dm91pgEAAAAAAAAC36HkmcGTHP1Lbx+KoWXQ/87LX7kfqC3AAAAAAGWAR0tskiYnhAzW3h+AJhiLbsgAAOe6lWa63L77b/wDToVR1vDMZKZq8THhn+/zBWgAAAAAAALPodZ9plv7ohWL3pOKcWkibRtbJM2n9v0B7AAAADeI5YtaI47orTvyDa158uBoAAAzE7NovMe9oAmiYnhs8+7aL7AlRanDXPhtintvHPpLeL18228eoOYyUtS9q3ja1Z2mGq86jof6isXpG2WP/AF8VJas1tMXrNbRzE+QMDLAAABIk0+DJqMngxRvPnPlHxBvotP8A1OeKzHyY73n3OiiIjaI7REbRCLS6emlxeCveZ5tPMyl32AGs324aTeZ7Alm1Y5R2vvxLQAAAAAAAAAAAZjdDqdTj09d8ttpniI5lVajqGXJ2x/N093P5guMupph75cla+6ZV+s1mjzxtbHa1o4vWNpVc878zPMyA28XefQ8TUBt4jxNQEmO1PH85Fpp93lb6bqGkpXwUj2UR6x+6kAdPXLGSN6Wi0esTuTv5y5rHacc+Klprb1h79P1Sa7RqI8UfajkFqNceSmWkXx2i1Z4mGwAAAAAAAAAADxa7X1wz7PF3y+v2TqOr9hT2eOfnp5+7Cm3nv6gza172m17TNp5mWAAAAAAAAAAABJp8+TT5PHjtt6xPErvSammpp4qRtaPpV9FA3xZb4ckZMczFo4B0Yi0uorqcUXrzxNfSUoAAAAAACLU5q4MFslvLiPWUqn6tn8eaMUcU5+IPHkvOS83vO9p5agAAAAAAAAAAAAAACfR550+aL7/JntePcv4mJ7xO8TxLmVx0nN7TD7K0/Kx9o+APcAAAAABPEz6Q5q9pte1p5mZmWQGoAAAAAAAAAAAAAAAD19KtNdZWI4tExIAuwAAAf//Z',
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
