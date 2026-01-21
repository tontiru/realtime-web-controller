import React, { useEffect, useState, useMemo } from 'react';
import { useSocket } from '../contexts/SocketContext.jsx';
import { Button } from 'components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from 'components/ui/card';
import { Input } from 'components/ui/input';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from 'components/ui/table';
import { Users, ClipboardCopy, Link as LinkIcon, Search, UserPlus, UserX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';

function HostView() {
  const socket = useSocket();
  const [lobbyId, setLobbyId] = useState('');
  const [players, setPlayers] = useState([]);
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 5;

  useEffect(() => {
    socket.on('lobby-created', (newLobbyId) => {
      setLobbyId(newLobbyId);
    });

    socket.on('player-joined', (updatedPlayers) => {
      setPlayers(updatedPlayers);
      setCurrentPage(1);
    });

    socket.on('player-updated', (updatedPlayers) => {
      setPlayers(updatedPlayers);
    });

    return () => {
      socket.off('lobby-created');
      socket.off('player-joined');
      socket.off('player-updated');
    };
  }, []);

  const createLobby = () => {
    socket.emit('create-lobby');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(lobbyId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  // Filter players based on search term
  const filteredPlayers = useMemo(() => {
    if (!searchTerm.trim()) return players;
    return players.filter(player => 
      player.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [players, searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredPlayers.length / playersPerPage);
  const paginatedPlayers = useMemo(() => {
    const startIndex = (currentPage - 1) * playersPerPage;
    return filteredPlayers.slice(startIndex, startIndex + playersPerPage);
  }, [filteredPlayers, currentPage]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="flex flex-col items-center justify-center min-h-screen"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 20 }}
      >
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Host View</CardTitle>
          </CardHeader>
          <CardContent>
            {!lobbyId ? (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className="w-full" size="lg" onClick={createLobby}>
                  Create Lobby
                </Button>
              </motion.div>
            ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <CardDescription>Share this code with players</CardDescription>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
                  className="flex flex-col items-center"
                >
                  <CardDescription>Scan with your phone</CardDescription>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-4 bg-white rounded-lg mt-2"
                  >
                    <QRCodeCanvas
                      value={`${window.location.origin}/controller?lobbyId=${lobbyId}`}
                      size={160}
                      bgColor={"#ffffff"}
                      fgColor={"#000000"}
                      level={"L"}
                      includeMargin={false}
                    />
                  </motion.div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 15 }}
                  className="flex flex-col items-center"
                >
                  <CardDescription>Or share this code</CardDescription>
                  <motion.div
                    className="flex items-center my-2"
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.h2
                      className="text-6xl font-bold tracking-widest"
                      animate={{ 
                        textShadow: ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 10px rgba(255,255,255,0.5)", "0px 0px 0px rgba(255,255,255,0)"]
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {lobbyId}
                    </motion.h2>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Button variant="ghost" size="icon" onClick={copyToClipboard} className="ml-4">
                        <ClipboardCopy className="w-8 h-8" />
                      </Button>
                    </motion.div>
                  </motion.div>
                  <AnimatePresence>
                    {copied && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-sm text-green-500 mb-2"
                      >
                        Copied!
                      </motion.p>
                    )}
                  </AnimatePresence>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link to={`/controller?lobbyId=${lobbyId}`} target="_blank">
                      <Button variant="link">
                          <LinkIcon className="w-4 h-4 mr-2" />
                          Open Controller
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <motion.h3
                  className="text-xl font-bold mb-4 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Users className="w-6 h-6 mr-2" />
                  </motion.div>
                  Players ({players.length})
                </motion.h3>
                
                {/* Search Input - Only show when there are players */}
                {players.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="relative mb-4"
                  >
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search players..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="pl-10"
                    />
                  </motion.div>
                )}

                {/* Players Table */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-left">Name</TableHead>
                        <TableHead className="text-right">Score</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <AnimatePresence mode="wait">
                        {paginatedPlayers.length > 0 ? (
                          paginatedPlayers.map((player) => (
                            <motion.tr
                              key={player.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            >
                              <TableCell className="font-medium">{player.name}</TableCell>
                              <TableCell className="text-right font-bold">{player.score}</TableCell>
                            </motion.tr>
                          ))
                        ) : (
                          <motion.tr
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <TableCell colSpan={2} className="text-center py-8 text-muted-foreground">
                              {searchTerm ? (
                                <div className="flex flex-col items-center">
                                  <UserX className="w-8 h-8 mb-2" />
                                  <p>No players match your search</p>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center">
                                  <UserPlus className="w-8 h-8 mb-2" />
                                  <p>No players yet</p>
                                </div>
                              )}
                            </TableCell>
                          </motion.tr>
                        )}
                      </AnimatePresence>
                    </TableBody>
                  </Table>
                </motion.div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex items-center justify-center gap-2 mt-4"
                  >
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                    </motion.div>
                    <span className="text-sm text-muted-foreground">
                      Page {currentPage} of {totalPages}
                    </span>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </CardContent>
      </Card>
      </motion.div>
    </motion.div>
  );
}

export default HostView;
