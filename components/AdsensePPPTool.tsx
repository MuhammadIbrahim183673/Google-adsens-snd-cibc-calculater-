"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Coins, TrendingUp, LogOut, User } from "lucide-react"
import { initializeApp } from "firebase/app"
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const provider = new GoogleAuthProvider()

export default function AdsensePPPTool() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState({
    displayName: "",
    country: "",
    tier: "Starter",
  })
  const [pageviews, setPageviews] = useState(1000)
  const [ctr, setCtr] = useState(2)
  const [cpc, setCpc] = useState(0.25)
  const [rewards, setRewards] = useState(0)
  const [history, setHistory] = useState([])

  const earnings = ((pageviews * (ctr / 100)) * cpc).toFixed(2)
  const engagementScore = Math.min(100, (pageviews / 5000) * 100).toFixed(0)

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        const docRef = doc(db, "users", currentUser.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const data = docSnap.data()
          setRewards(data.rewards || 0)
          setHistory(data.history || [])
          setProfile({
            displayName: data.displayName || currentUser.displayName,
            country: data.country || "",
            tier: data.tier || "Starter",
          })
        } else {
          await setDoc(docRef, {
            rewards: 0,
            history: [],
            displayName: currentUser.displayName,
            country: "",
            tier: "Starter",
          })
        }
      } else {
        setUser(null)
      }
    })
  }, [])

  const handleProfileUpdate = async () => {
    if (user) {
      const docRef = doc(db, "users", user.uid)
      await updateDoc(docRef, {
        displayName: profile.displayName,
        country: profile.country,
        tier: profile.tier,
      })
      alert("Profile updated successfully")
    }
  }

  const handleEngage = async () => {
    const bonus = Math.random() * 0.5
    const earned = parseFloat((parseFloat(earnings) * 0.1 + bonus).toFixed(2))
    const updatedRewards = parseFloat((rewards + earned).toFixed(2))
    const newEntry = {
      date: new Date().toLocaleDateString(),
      earned,
    }
    const newHistory = [...history, newEntry]

    // Auto-assign tier
    const newTier =
      updatedRewards >= 5000
        ? "Partner"
        : updatedRewards >= 1000
        ? "Builder"
        : "Starter"

    setRewards(updatedRewards)
    setHistory(newHistory)
    setProfile((prev) => ({ ...prev, tier: newTier }))

    if (user) {
      const userRef = doc(db, "users", user.uid)
      await updateDoc(userRef, {
        rewards: updatedRewards,
        history: arrayUnion(newEntry),
        tier: newTier,
      })
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.error("Login Error", error)
    }
  }

  const handleLogout = () => {
    signOut(auth)
  }

  if (!user) {
    return (
      <div className="grid gap-6 p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center">
          Login to Your Dashboard
        </h1>
        <Card>
          <CardContent className="grid gap-4 py-6">
            <Button onClick={handleGoogleLogin}>Sign in with Google</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="grid gap-6 p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          Welcome, {profile.displayName || user.email}
        </h1>
        <Button variant="ghost" onClick={handleLogout}>
          <LogOut className="mr-2 w-4 h-4" />
          Logout
        </Button>
      </div>

      <Card>
        <CardContent className="grid gap-4 py-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <User className="w-5 h-5" />
            Profile Info
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold">Display Name</label>
              <Input
                type="text"
                value={profile.displayName}
                onChange={(e) =>
                  setProfile({ ...profile, displayName: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Country</label>
              <Input
                type="text"
                value={profile.country}
                onChange={(e) =>
                  setProfile({ ...profile, country: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm font-semibold">PPP Tier</label>
              <Input type="text" value={profile.tier} readOnly />
            </div>
          </div>
          <Button onClick={handleProfileUpdate}>Update Profile</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="grid gap-4 py-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold">Daily Pageviews</label>
              <Input
                type="number"
                value={pageviews}
                onChange={(e) => setPageviews(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="text-sm font-semibold">CTR (%)</label>
              <Input
                type="number"
                value={ctr}
                onChange={(e) => setCtr(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="text-sm font-semibold">CPC ($)</label>
              <Input
                type="number"
                step="0.01"
                value={cpc}
                onChange={(e) => setCpc(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="bg-green-100 rounded-xl p-4 text-green-800 font-medium flex items-center gap-2">
            <TrendingUp className="w-5 h-5" /> Estimated Daily Earnings:{" "}
            <span className="text-lg font-bold">${earnings}</span>
          </div>

          <div className="bg-blue-100 rounded-xl p-4 text-blue-800 font-medium flex items-center gap-2">
            <Coins className="w-5 h-5" /> PPP Rewards Earned:{" "}
            <span className="text-lg font-bold">{rewards} XIBC</span>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Engagement Score</label>
            <Progress value={engagementScore} />
            <span className="text-sm text-gray-600">
              {engagementScore}% - Higher engagement = More crypto rewards
            </span>
          </div>

          <Button className="mt-4" onClick={handleEngage}>
            Engage to Earn More
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="py-6">
          <h2 className="text-xl font-semibold mb-4">Earnings History</h2>
          <ul className="grid gap-2">
            {history.map((entry, index) => (
              <li key={index} className="text-sm text-gray-700">
                {entry.date}: Earned{" "}
                <span className="font-bold">{entry.earned} XIBC</span>
              </li>
            ))}
            {history.length === 0 && (
              <li className="text-gray-500">No earning history yet.</li>
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}