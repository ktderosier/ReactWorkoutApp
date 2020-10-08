import React, { useState, useEffect } from "react";
import { Table, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getProfile } from "../../api";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';



const ProfileView = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    refreshProfile();
  }, []);

  const refreshProfile = async () => {
    const data = await getProfile();
    setProfile(data);
  };



  const useStyles = makeStyles(({ palette }) => ({
    card: {
      borderRadius: 12,
      minWidth: 256,
      textAlign: 'center',
    },
    avatar: {
      width: 60,
      height: 60,
      margin: 'auto',
    },
    heading: {
      fontSize: 18,
      fontWeight: 'bold',
      letterSpacing: '0.5px',
      marginTop: 8,
      marginBottom: 0,
    },
    subheader: {
      fontSize: 14,
      color: palette.grey[500],
      marginBottom: '0.875em',
    },
    statLabel: {
      fontSize: 12,
      color: palette.grey[500],
      fontWeight: 500,
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      margin: 0,
    },
    statValue: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 4,
      letterSpacing: '1px',
    },
  }));

  const styles = useStyles();
  const classes = useStyles();

  return (
    <>
<h1>Profile</h1>
<Card className={cx(styles.card)}>
      <CardContent key={profile._id}>
        <Avatar className={styles.avatar} src={'https://i.pravatar.cc/300'} />
        <h3 className={styles.heading}>{profile.name}</h3>
      </CardContent>
      <Divider light />
      <Box display={'flex'}>
        <Box p={2} flex={'auto'} className={classes.root}>
          <p className={styles.statLabel}>Weight</p>
          <p className={styles.statValue}>{profile.weight} kg</p>
        </Box>
        <Box p={2} flex={'auto'} className={classes.root}>
          <p className={styles.statLabel}>age: {profile.age}</p>
          <p className={styles.statLabel}>height: {profile.height} cm</p>

        </Box>
      </Box>
    </Card>


        {/* <Container>
        <Row>
          <Col>
            <div>
              <h1>Profile</h1>
            </div>
            <Table striped bordered hover size="sm" variant="dark">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Weight</th>
                  <th>Height</th>
                </tr>
              </thead>
              <tbody>
                <tr key={profile._id}>
                  <td>{profile.name}</td>
                  <td>{profile.age} </td>
                  <td>{profile.weight} kg</td>
                  <td>{profile.height} cm</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container> */}

      <Container fluid="md">
        <Row>
          <Col>
            <Link to={"/workouts/saved"}>
              <Button variant="info" size="lg" active>
                Favorited workouts
              </Button>
            </Link>
          </Col>
          <Col>
            <Link to={"/workouts/add"}>
              <Button variant="info" size="lg" active>
                Create new workout
              </Button>
            </Link>
          </Col>
          <Col>
            <Link to={"/profile/edit"}>
              <Button variant="info" size="lg" active>
                Edit profile
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfileView;
