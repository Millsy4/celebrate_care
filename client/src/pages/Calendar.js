import React from "react";
import DatePickers from "../components/DatePickers";
import BasicGallery from "../components/BasicGallery";
import EventCalendar from "../components/EventCalendar";
import Header from "../components/Header"
import Container from '@material-ui/core/Container';
import Navbar from '../components/Navbar'

export default function Calendar() {
  return (
    <div>
      <Header />
      <Navbar />
      <Container maxWidth="md">
        <EventCalendar />
      </Container>
      
    </div>
  );
}
