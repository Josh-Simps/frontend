import OnboardingPage from './OnboardingPage'

const BookOnboarding = () => {
  return (
    <>
      <OnboardingPage
        image="https://i0.wp.com/www.printmag.com/wp-content/uploads/2017/01/2a34d8_7d647af009db499f9d0bb7c18a2c7c7cmv2.jpg?resize=795%2C1200&ssl=1"
        imageColour="rgba(255, 109, 50, 1)"
        textBackgroundColor='white'
        modernEnglishText="Do you struggle with the"
        oldEnglishText="perusal of text?"
        currentStage={33}
      />
    </>
  )
}

export default BookOnboarding
