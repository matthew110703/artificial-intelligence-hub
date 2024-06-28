import hashlib
import secrets


def hash_password(password: str) -> str:
    """Hash a password for the first time with a randomly-generated salt."""
    # Using secrets module to generate a cryptographically strong random number
    salt = secrets.token_hex(16)
    hashing = hashlib.sha256((password + salt).encode()).hexdigest()
    hashed_password = salt + hashing
    return hashed_password


def verify_password(provided_password: str, stored_password: str) -> bool:
    """Verify a stored password against one provided by user"""
    # Verify a stored password against one provided by user
    salt = stored_password[:32]
    hashed_password = stored_password[32:]

    login_hash = hashlib.sha256((provided_password + salt).encode()).hexdigest()
    return hashed_password == login_hash
