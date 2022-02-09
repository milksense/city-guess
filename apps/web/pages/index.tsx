import { useEffect, useState } from "react";
import { Card, Grid, Text, Container, Link, Loading } from "@nextui-org/react";
import _ from 'lodash';
import Lottie from "lottie-react";
import notFoundAnimation from "../public/notfound.json";

const IndexPage = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [city, setCity] = useState<string>('default');

  useEffect(() => {
    const timeZone: string = Intl
      .DateTimeFormat()
      .resolvedOptions()
      .timeZone
      .toLocaleLowerCase();
    setCity(timeZone.replace(/\w+\//, ''));
    setLoading(true);

    const timer = setTimeout(() => {
      fetch(`https://api.teleport.org/api/urban_areas/slug:${city}/images/`)
        .then((res) => res.json())
        .then((data) => {
          setData(data?.photos?.[0]?.image?.mobile);
          setLoading(false);
        });
    }, _.random(1231, 3910));

    return () => clearTimeout(timer);
  }, [city]);

  return (
    <Container justify="center" alignContent="center" xs>
      <Grid xs={12}>
        <Card css={{ px: '$4', mt: 20 }}>
          <Text
            h1
            size={60}
            css={{
              textGradient: '45deg, $blue500 -20%, $pink500 50%'
            }}
            weight="bold"
          >
            {isLoading ? `Let's` : `Your`}
          </Text>
          <Text
            h1
            size={60}
            css={{
              textGradient: '45deg, $purple500 -20%, $pink500 100%'
            }}
            weight="bold"
          >
            {isLoading ? `Guess your` : `City is`}
          </Text>
          <Text
            h1
            size={60}
            css={{
              textGradient: '45deg, $yellow500 -20%, $red500 100%',
              textTransform: 'capitalize'
            }}
            weight="bold"
          >
            {isLoading ? `City` : `${city}`}
          </Text>
        </Card>
      </Grid>
      <Grid xs={12}>
        {isLoading ? (
          <Card css={{ mt: 20 }}>
            <Loading />
          </Card>
        ) : !data ? (
          <Card css={{ mt: 20 }}>
            <Lottie animationData={notFoundAnimation} style={{
              height: 300
            }} />
          </Card>
        ) : (
          <Card cover css={{ mt: 20 }}>
            <Card.Image
              src={data}
              height={340}
              width="100%"
              alt="Your city image"
              showSkeleton={isLoading}
            />
          </Card>
        )}
      </Grid>
      <Grid xs={12}>
        <Card css={{ px: '$4', mt: 20, mb: 20 }}>
          <Text>Made with ❤️ be careful on the Web</Text>
          <Card.Footer>
            <Link color="primary" target="_blank" href="https://github.com/milksense/city-guess">
              Visit source code on GitHub
            </Link>
          </Card.Footer>
        </Card>
      </Grid>
    </Container>
  );
};

export default IndexPage;
