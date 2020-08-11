import React from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Header from '~/components/header/Header.component';
import Footer from '~/components/footer/Footer.component';
import styles from '~/styles/pages/profile.module.scss';
import { storeUserDetails } from '../redux/actions/profile';

const fieldsErrorMessages = {
  name: 'Please add your name.',
  username: 'Username selected is already in use.',
  email: 'Please add your email.',
};

class Profile extends React.PureComponent {
  async componentDidMount() {
    const { dispatch } = this.props;
    // const user = await (await fetch('')).json();
    const user = {
      name: 'johhnnnn doe',
      avatar: '',
      email: 'john@email.com',
      username: 'jdoe',
    };

    if (user) {
      return dispatch(storeUserDetails(user));
    }

    const router = useRouter();
    return router.push('/404');
  }

  updateUserDetails = () => {

  }

  render() {
    const { userDetails, isGettingUser } = this.props;

    if (isGettingUser) {
      return (<div>Loading</div>);
    }

    const {
      name, username, avatar, email,
    } = userDetails;
    return (
      <>
        <Head>
          <title>
            { `${name} ` }
            | FrontEnd.ro
          </title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <>
          <Header />
          <main className={styles.page}>
            { avatar ? <img alt={name} src={avatar} /> : <img alt={name} src="https://www.timeshighereducation.com/sites/default/files/byline_photos/anonymous-user-gravatar_0.png" /> }
            <input type="text" id="name" value={name} placeholder="Name" />
            {' '}
            <br />
            <input type="text" value={username} placeholder="Username" />
            {' '}
            <br />
            <input type="email" value={email} placeholder="Email" />
            {' '}
            <br />
            <input type="file" value={avatar} placeholder="Avatar" />
            {' '}
            <br />
            <button type="button" className="btn btn--success updateDetailsBtn" onClick={this.updateUserDetails}>
              Update
            </button>
          </main>
          <Footer />
        </>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isGettingUser: state.profile.isGettingUser,
  userDetails: state.profile.userDetails,
  userProgress: state.profile.userProgress,
});

export default connect(mapStateToProps)(Profile);
