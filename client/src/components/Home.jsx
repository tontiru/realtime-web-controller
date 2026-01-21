import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from 'components/ui/card';
import { Rocket, Gamepad2 } from 'lucide-react';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Real-time Web Controller</CardTitle>
          <CardDescription className="text-center">
            Create a lobby or join as a controller.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <Link to="/host" className="w-full">
            <Button className="w-full" size="lg">
              <Rocket className="w-5 h-5 mr-2" />
              Create Lobby
            </Button>
          </Link>
          <Link to="/controller" className="w-full">
            <Button className="w-full" variant="secondary" size="lg">
              <Gamepad2 className="w-5 h-5 mr-2" />
              Join as Controller
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

export default Home;
