import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from 'components/ui/card';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="flex flex-col items-center justify-center min-h-screen"
    >
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex justify-center mb-4"
          >
            <AlertTriangle className="w-16 h-16 text-destructive" />
          </motion.div>
          <CardTitle className="text-4xl font-bold">404 - Not Found</CardTitle>
          <CardDescription>The page you're looking for doesn't exist.</CardDescription>
        </CardHeader>
        <CardContent>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/">
              <Button>Go Back Home</Button>
            </Link>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default NotFound;
