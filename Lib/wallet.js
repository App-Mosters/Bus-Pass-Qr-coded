import { db } from '../firebase';
import firebase from 'firebase/compat/app';

export async function topUpWallet(uid, amount) {
  if (amount <= 0) throw new Error('Top-up amount must be positive');

  const userRef = db.collection('users').doc(uid);
  const txnRef = db.collection('transactions').doc();

  return db.runTransaction(async (transaction) => {
    const userDoc = await transaction.get(userRef);
    if (!userDoc.exists) throw new Error('User not found');

    const currentBalance = userDoc.data().walletBalance || 0;
    const newBalance = currentBalance + amount;

    transaction.update(userRef, { walletBalance: newBalance });
    transaction.set(txnRef, {
      userId: uid,
      type: 'topup',
      amount,
      balanceAfter: newBalance,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    return newBalance;
  });
}

export async function deductFare(scannedUid, fareAmount = 50) {
  const userRef = db.collection('users').doc(scannedUid);
  const txnRef = db.collection('transactions').doc();

  return db.runTransaction(async (transaction) => {
    const userDoc = await transaction.get(userRef);
    if (!userDoc.exists) throw new Error('Pass not recognized');

    const currentBalance = userDoc.data().walletBalance || 0;
    if (currentBalance < fareAmount) {
      throw new Error('Insufficient balance');
    }

    const newBalance = currentBalance - fareAmount;
    transaction.update(userRef, { walletBalance: newBalance });
    transaction.set(txnRef, {
      userId: scannedUid,
      type: 'fare',
      amount: -fareAmount,
      balanceAfter: newBalance,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    return newBalance;
  });
}