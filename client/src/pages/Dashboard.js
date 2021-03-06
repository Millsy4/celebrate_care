import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Navbar from '../components/Navbar';
import { useUserContext } from '../services/userContext';
// import AddEvent from '../components/AddEvent';
import API from '../utils/API';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import EditUpcomingModal from '../components/EditUpcomingModal';
import EditWishlistModal from '../components/EditWishlistModal';

import FavoriteIcon from '@material-ui/icons/Favorite';
import Image1 from "../images/baby.jpg";
import Image2 from "../images/baking.jpg";
import Image3 from "../images/baseball.jpg";
import Image4 from "../images/birthday.jpg";
import Image5 from "../images/cute child.jpg";
import Image6 from "../images/dinner.jpg";
import Image7 from "../images/dog.jpg";
import Image8 from "../images/fall walk.jpg";
import Image9 from "../images/happy.jpg";
import Image10 from "../images/hiking.jpg";
import Image11 from "../images/holiday.jpg";
import Image12 from "../images/guitar.jpg";
import Image13 from "../images/presents.jpg";
import Image14 from "../images/smiling.jpg";
import Image15 from "../images/soccer.jpg";
import Image16 from "../images/walking.jpg";
import Image17 from "../images/reading.jpg";
import Image18 from "../images/grandpa.jpg";

const images = [
  Image1,
  Image2,
  Image3,
  Image4,
  Image5,
  Image6,
  Image7,
  Image8,
  Image9,
  Image10,
  Image11,
  Image12,
  Image13,
  Image14,
  Image15,
  Image16,
  Image17,
  Image18,
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    height: '400',
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  heading: {
    flexStart: 2,
  },
  title: {
    color: 'black',
    fontWeight: '800',
  },
  titleBar: {
    height: '200',
    background:
      'linear-gradient(to top, rgba(61,109,111,1) 0%, rgba(61,109,111,0.6) 70%, rgba(61,109,111,0) 100%)',
  },
  icon: {
    color: '#BF4031'
  }
}));

export default function Dashboard() {
  const { user, setUser } = useUserContext();
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [wishlistEvents, setWishlistEvents] = useState([]);
  const [eventIdeas, setEventIdeas] = useState([]);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("userId"));
    if (user.userId === "" && userId) {
      API.getUserInfo(userId).then(({ data }) => {
        console.log(data);
        const familycodes = data.Familyties.map(
          (relationship) => relationship.FamilycodeId
        );
        setUser({
          userId: data.id,
          familycodeId: familycodes,
        });
      });
    }
    loadUpcomingEvents();
    loadWishlistEvents();
    loadEventIdeas();
  }, [user]);

  function loadUpcomingEvents() {
    console.group(user);
    let eventStatus = 'upcoming';
    let familycodeId = user.familycodeId[0];
    API.getFamilyUpcomingEvents(familycodeId, eventStatus)
      .then((res) => {
        console.log(res.data);
        let unvalidatedEvents = res.data;
        const validatedEvents = [];
        unvalidatedEvents.forEach((event) => {
          const validEvent = {
            title: event.eventIdea,
            author: event.familyCode,
            img: images[Math.floor(Math.random() * images.length)],
            id: event.id,
          };
          validatedEvents.push(validEvent);
        });
        setUpcomingEvents(...upcomingEvents, validatedEvents);
      })
      .catch((err) => console.log(err));
  }
  function loadWishlistEvents() {
    console.group(user);
    let eventStatus = 'wishlist';
    let familycodeId = user.familycodeId[0];
    API.getFamilyUpcomingEvents(familycodeId, eventStatus)
      .then((res) => {
        console.log(res.data);
        let unvalidatedEvents = res.data;
        const validatedEvents = [];
        unvalidatedEvents.forEach((event) => {
          const validEvent = {
            title: event.eventIdea,
            author: event.familyCode,
            img: images[Math.floor(Math.random() * images.length)],
            id: event.id,
          };
          validatedEvents.push(validEvent);
        });
        setWishlistEvents(...wishlistEvents, validatedEvents);
      })
      .catch((err) => console.log(err));
  }

  function loadEventIdeas() {
    console.group(user);
    let eventStatus = 'idea';
    API.getEventIdeas(eventStatus)
      .then((res) => {
        console.log(res.data);
        let unvalidatedEvents = res.data;
        const validatedEvents = [];
        unvalidatedEvents.forEach((event) => {
          const validEvent = {
            title: event.eventIdea,
            author: 'celebrate_care',
            img: images[Math.floor(Math.random() * images.length)],
            id: event.id,
          };
          validatedEvents.push(validEvent);
        });
        setEventIdeas(...eventIdeas, validatedEvents);
      })
      .catch((err) => console.log(err));
  }

  function addFav() {
    let eventStatus = 'wishlist';
    let familycodeId = user.familycodeId[0];
    console.log(familycodeId)
    API.addFav(familycodeId, eventStatus, eventIdeas)
      .catch((err) => console.log(err))
  }

  function changeStatus(event) {
    const { name, value } = event.target;
    setEventIdeas({ ...eventIdeas, [name]: value });
    console.log(eventIdeas);
    addFav();
  }



  const classes = useStyles();
  return (
    <div>
      <Box pb={5}>
        <Grid container className={classes.root} xs={12}>
          <Header />
          <Navbar />
          <Box>
            <Grid container className={classes.heading} justify="flex-start 1">
              <h1>
                {" "}
                <font color="#EA7A57">Upcoming Events</font>
              </h1>
            </Grid>
            <Container maxWidth="lg" style={{ width: "95%" }}>
              <div className={classes.root}>
                <GridList
                  className={classes.gridList}
                  spacing={5}
                  cellHeight={400}
                  cols={2.5}
                >
                  {upcomingEvents?.map((event) => (
                    <GridListTile key={event.img} eventId={event.id} fontSize={50}>
                      <img src={event.img} alt={event.title} />
                      <GridListTileBar
                        cellHeight={150}
                        title={event.title}
                        classes={{
                          root: classes.titleBar,
                          title: classes.title,
                        }}
                        actionIcon={<EditUpcomingModal />}
                        eventId={event.id}
                      />
                    </GridListTile>
                  ))}
                </GridList>
              </div>
            </Container>
            <Grid container className={classes.heading}>
              <h1>
                <font color="#EA7A57">Event Wishlist</font>
              </h1>
            </Grid>
            <Container maxWidth="lg" style={{ width: "95%" }}>
              <div className={classes.root}>
                <GridList
                  className={classes.gridList}
                  spacing={5}
                  cellHeight={400}
                  cols={2.5}
                >
                  {wishlistEvents?.map((event) => (
                    <GridListTile key={event.img} eventId={event.id} fontSize={50}>
                      <img src={event.img} alt={event.title} />
                      <GridListTileBar
                        cellHeight={150}
                        title={event.title}
                        classes={{
                          root: classes.titleBar,
                          title: classes.title,
                        }}
                        actionIcon={<EditWishlistModal />}
                        eventId={event.id}
                      />
                    </GridListTile>
                  ))}
                </GridList>
              </div>
            </Container>
            <Grid container className={classes.heading}>
              <h1>
                <font color="#EA7A57">Event Ideas</font>
              </h1>
            </Grid>
            <Container maxWidth="lg" style={{ width: "95%" }}>
              <div className={classes.root}>
                <GridList
                  className={classes.gridList}
                  spacing={5}
                  cellHeight={400}
                  cols={2.5}
                >
                  {eventIdeas?.map((event) => (
                    <GridListTile key={event.img} eventId={event.id} fontSize={50}>
                      <img src={event.img} alt={event.title} />
                      <GridListTileBar
                        cellHeight={150}
                        title={event.title}
                        classes={{
                          root: classes.titleBar,
                          title: classes.title,
                        }}
                        actionIcon={
                          <IconButton aria-label={event.title} name="eventIdea" onClick={changeStatus}>
                            <FavoriteIcon className={classes.icon} />
                          </IconButton>
                        }
                        eventId={event.id}
                      />
                    </GridListTile>
                  ))}
                </GridList>
              </div>
            </Container>
          </Box>
        </Grid>
      </Box>
    </div >
  );
}
