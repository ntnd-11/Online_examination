import { Box, Text, Link, Image } from '@chakra-ui/react';
import '../styles/pagenotfound.scss'
function PageNotFound() {
    return (
        <Box display={'flex'} flex={1} flexDirection={'column'}>
            <Box display={'flex'} justifyContent={'center'}>
                <Image className='errorImg'
                    boxSize='500px'
                    src='https://i.imgur.com/qIufhof.png'
                    alt='404notfound'
                    alignItems={'center'}
                    mb={'-10'}
                />
            </Box>
            <Text className='title1'>
                PAGE NOT FOUND
            </Text>
            <Text className='title2'>
                I think you just went to a page non-exiting page.
            </Text>
            <Text className='title2'>
                But you can click the button below to go back to the homepage.
            </Text>
            <Link className='returnBtn'
                to={'/'}
                fontSize={'30'}
                color={'blue'}
            >
                Go Home
            </Link>
        </Box>
    );
}

export default PageNotFound;