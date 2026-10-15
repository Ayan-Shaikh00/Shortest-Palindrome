function shortestPalindrome(s: string): string {
    if (s.length <= 1) return s;

    // Create the reversed version of the string
    const revS = s.split('').reverse().join('');
    
    // Combine with a separator to avoid boundary crossing
    const temp = s + '#' + revS;
    const n = temp.length;
    
    // Create the KMP table (LPS array)
    const lps: number[] = new Array(n).fill(0);
    
    for (let i = 1; i < n; i++) {
        let j = lps[i - 1];
        
        while (j > 0 && temp[i] !== temp[j]) {
            j = lps[j - 1];
        }
        
        if (temp[i] === temp[j]) {
            j++;
        }
        
        lps[i] = j;
    }
    
    // The last element gives the length of the longest palindromic prefix
    const longestPalPrefixLen = lps[n - 1];
    
    // Take the non-palindromic suffix from the end of s, reverse it, and prepend it
    const nonPalindromicSuffix = s.substring(longestPalPrefixLen);
    const prependStr = nonPalindromicSuffix.split('').reverse().join('');
    
    return prependStr + s;
}
